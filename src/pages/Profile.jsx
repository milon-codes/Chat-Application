import { useEffect, useState, useContext, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";

import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

import { AuthContext } from "../context/AuthContext";
import { ThemeContext } from "../context/ThemeContext";

import { uploadToCloudinary } from "../utils/cloudinary";
import EditProfileModal from "../components/EditProfileModal";
import Loader from "../components/Loader";

/* Icons */
import {
  IoIosChatbubbles,
  IoMdPin,
  IoMdCreate,
  IoMdLogOut,
  IoMdCheckmarkCircle,
  IoMdCalendar,
  IoMdMail,
  IoMdHome,
  IoIosSunny,
  IoIosMoon,
} from "react-icons/io";
import { FaUserSlash, FaFingerprint } from "react-icons/fa";

const Profile = () => {
  const { user, logoutUser } = useContext(AuthContext);
  const { darkMode, setDarkMode } = useContext(ThemeContext);

  console.log(user.email, user.uid, user.profilePhoto, "user info");

  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();
  const profileInputRef = useRef(null);
  const coverInputRef = useRef(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (!user?.uid) return;
        setLoading(true); // 👈 এটা যোগ করে দিন
        const snap = await getDoc(doc(db, "users", user.uid));

        if (snap.exists()) {
          setProfileData(snap.data());
        } else {
          setProfileData(null); // ডেটা না থাকলে খালি করে দিন
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [user]);

  const handleImageUpdate = async (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const url = await uploadToCloudinary(file);
      const field = type === "profile" ? "profilePhoto" : "coverPhoto";
      await updateDoc(doc(db, "users", user.uid), { [field]: url });
      setProfileData((p) => ({ ...p, [field]: url }));
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  const handleLogout = async () => {
    await logoutUser();
    navigate("/login");
  };

  const joinedDate = profileData?.createdAt
    ? new Date(profileData.createdAt.seconds * 1000).toLocaleDateString(
        "en-GB",
        {
          day: "2-digit",
          month: "long",
          year: "numeric",
        },
      )
    : "N/A";

  if (loading) {
    return <Loader />;
  }

  return (
    /* মেন কন্টেইনারে ডার্ক মোড কালার আরও রিফাইন্ড করা হয়েছে */
    <div className="min-h-screen bg-[#f3f6ff] text-slate-800 dark:bg-[#0f172a] dark:text-gray-100 p-4 md:p-10 font-sans transition-colors duration-500">
      <input
        type="file"
        ref={profileInputRef}
        className="hidden"
        accept="image/*"
        onChange={(e) => handleImageUpdate(e, "profile")}
      />
      <input
        type="file"
        ref={coverInputRef}
        className="hidden"
        accept="image/*"
        onChange={(e) => handleImageUpdate(e, "cover")}
      />

      {uploading && (
        <div className="fixed inset-0 bg-white/60 dark:bg-black/60 backdrop-blur-md flex items-center justify-center z-[100]">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-2xl flex flex-col items-center gap-4 border border-indigo-100 dark:border-gray-700">
            <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
            <p className="font-bold text-indigo-600 dark:text-indigo-400">
              Updating Assets...
            </p>
          </div>
        </div>
      )}

      <div className="max-w-5xl mx-auto space-y-6">
        {/* Navigation - Dark mode support added */}
        <nav className="flex justify-between items-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg px-6 py-4 rounded-[2rem] shadow-sm border border-white/50 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-200 dark:shadow-none">
              <IoIosChatbubbles className="text-xl" />
            </div>
            <span className="text-xl font-extrabold tracking-tight dark:text-white">
              Chatly
            </span>
          </div>
          <Link
            to="/"
            className="px-5 py-2 rounded-xl bg-slate-100 dark:bg-gray-700 hover:bg-slate-200 dark:hover:bg-gray-600 transition-all font-semibold text-sm"
          >
            <IoMdHome className="text-xl dark:text-white" />
          </Link>
        </nav>

        {/* Hero Card - Added dark:bg-gray-800 */}
        <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm border border-white dark:border-gray-700">
          <div className="relative h-48 md:h-64 group">
            <img
              src={
                profileData?.coverPhoto ||
                "https://via.placeholder.com/1200x400"
              }
              className="w-full h-full object-cover"
              alt="cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            <button
              onClick={() => coverInputRef.current.click()}
              className="absolute top-4 right-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider shadow-sm hover:bg-white transition dark:text-white dark:border dark:border-gray-600"
            >
              Edit Cover
            </button>
          </div>

          <div className="px-6 md:px-12 pb-10 relative">
            <div className="flex flex-col md:flex-row items-center md:items-end gap-6 -mt-16 md:-mt-20">
              {/* Profile Image */}
              <div
                className="relative group cursor-pointer"
                onClick={() => profileInputRef.current.click()}
              >
                <div className="w-32 h-32 md:w-44 md:h-44 rounded-[2.5rem] p-1 bg-gradient-to-tr from-indigo-500 to-purple-500 shadow-2xl">
                  <img
                    src={
                      profileData?.profilePhoto ||
                      "https://via.placeholder.com/150"
                    }
                    className="w-full h-full object-cover rounded-[2.3rem] border-4 border-white dark:border-gray-800 bg-white dark:bg-gray-700"
                    alt="avatar"
                  />
                </div>
                <div className="absolute inset-0 bg-black/20 rounded-[2.5rem] opacity-0 group-hover:opacity-100 flex items-center justify-center transition backdrop-blur-sm">
                  <IoMdCreate className="text-white text-3xl" />
                </div>
              </div>

              {/* User Info */}
              <div className="flex-1 text-center md:text-left pb-2">
                <div className="flex items-center gap-2 justify-center md:justify-start">
                  <h2 className="text-3xl font-black text-slate-800 dark:text-white tracking-tight">
                    {profileData?.fullName}
                  </h2>
                  <IoMdCheckmarkCircle className="text-indigo-500 text-xl" />
                </div>
                <p className="text-gray-500 dark:text-gray-400 font-medium text-lg">
                  {profileData?.bio || "No bio added yet"}
                </p>
                <div className="flex flex-wrap gap-4 justify-center md:justify-start mt-1 text-sm font-medium">
                  <span className="text-indigo-600 dark:text-indigo-400">
                    @{profileData?.userName}
                  </span>
                  <span className="flex items-center gap-1 text-slate-400 dark:text-gray-500">
                    <IoMdPin className="text-indigo-400" />{" "}
                    {profileData?.location || "Earth"}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setIsModalOpen(true)}
                className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold shadow-lg shadow-indigo-100 dark:shadow-none transition active:scale-95 text-sm"
              >
                Edit Profile
              </button>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-12 space-y-6">
            {/* About Me */}
            <div className="bg-white dark:bg-gray-800 rounded-[2rem] p-8 shadow-sm border border-white dark:border-gray-700">
              <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-indigo-500 mb-4">
                About Me
              </h3>
              <p className="text-slate-500 dark:text-gray-400 font-medium leading-relaxed">
                {profileData?.about || "Tell the world about yourself..."}
              </p>
            </div>

            {/* Personal Info - Added dark classes */}
            <div className="bg-white dark:bg-gray-800 rounded-[2rem] p-8 shadow-sm border border-white dark:border-gray-700">
              <h3 className="text-sm font-bold text-slate-800 dark:text-white mb-6">
                Personal Info
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <InfoItem
                  icon={<IoMdMail />}
                  label="Email"
                  value={profileData?.email}
                  color="text-blue-500"
                  bg="bg-blue-50 dark:bg-blue-900/20"
                />
                <InfoItem
                  icon={<FaFingerprint />}
                  label="User ID"
                  value={user.uid.slice(0, 12)}
                  color="text-purple-500"
                  bg="bg-purple-50 dark:bg-purple-900/20"
                />
                <InfoItem
                  icon={<IoMdCalendar />}
                  label="Joined"
                  value={joinedDate}
                  color="text-orange-500"
                  bg="bg-orange-50 dark:bg-orange-900/20"
                />
              </div>
            </div>
          </div>

          {/* Modern Premium Theme Toggle */}
          <div className="lg:col-span-12 p-6 bg-white dark:bg-gray-800 rounded-[2rem] shadow-sm border border-white dark:border-gray-700 flex items-center justify-between">
            <div className="flex flex-col">
              <h2 className="font-bold text-slate-800 dark:text-white">
                Appearance
              </h2>
              <p className="text-xs text-slate-400">
                {darkMode ? "Dark theme activated" : "Light theme activated"}
              </p>
            </div>

            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`relative w-16 h-8 rounded-full p-1 transition-all duration-500 shadow-inner focus:outline-none 
              ${darkMode ? "bg-indigo-600" : "bg-slate-200"}`}
            >
              <div
                className={`w-6 h-6 rounded-full bg-white shadow-md transform transition-transform duration-500 flex items-center justify-center
                ${darkMode ? "translate-x-8" : "translate-x-0"}`}
              >
                {darkMode ? (
                  <IoIosMoon className="w-4 h-4 text-indigo-600" />
                ) : (
                  <IoIosSunny className="w-4 h-4 text-yellow-500" />
                )}
              </div>
            </button>
          </div>

          {/* Action Area */}
          <div className="lg:col-span-12 flex flex-col md:flex-row gap-4">
            <button
              onClick={() => navigate("/blocked-users")}
              className="flex-1 flex items-center justify-between p-5 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-white dark:border-gray-700 hover:bg-slate-50 dark:hover:bg-gray-750 transition font-bold text-slate-700 dark:text-white"
            >
              <span className="flex items-center gap-3 text-sm italic">
                <FaUserSlash className="text-slate-400" /> Block List
              </span>
              <span className="text-slate-300">→</span>
            </button>

            <button
              onClick={handleLogout}
              className="flex-1 p-5 rounded-2xl bg-[#ff4d4d] text-white font-black hover:bg-red-600 transition shadow-lg shadow-red-100 dark:shadow-none flex items-center justify-center gap-2 uppercase text-xs tracking-widest"
            >
              <IoMdLogOut className="text-lg" /> Logout Account
            </button>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <EditProfileModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          userData={profileData}
          userId={user.uid}
        />
      )}
    </div>
  );
};

/* Reusable Info Item */
const InfoItem = ({ icon, label, value, color, bg }) => (
  <div className="flex items-center gap-4 bg-slate-50/50 dark:bg-gray-800/50 p-4 rounded-[1.5rem] border border-slate-100 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-700 hover:shadow-md transition-all duration-300 group">
    {/* আইকন কন্টেইনার */}
    <div
      className={`w-12 h-12 flex items-center justify-center rounded-xl ${bg} ${color} text-xl shadow-inner transition-transform group-hover:scale-110 duration-300`}
    >
      {icon}
    </div>

    {/* টেক্সট এরিয়া */}
    <div className="flex flex-col">
      <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-gray-500 tracking-wider">
        {label}
      </span>
      <span className="font-bold text-slate-700 dark:text-gray-200 text-sm truncate max-w-[150px]">
        {value}
      </span>
    </div>
  </div>
);

export default Profile;
