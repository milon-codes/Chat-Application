import React, { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { 
  getAuth, 
  updatePassword, 
  reauthenticateWithCredential, 
  EmailAuthProvider 
} from "firebase/auth"; 
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

/**
 * পাসওয়ার্ড ইনপুট কম্পোনেন্ট (Component-এর বাইরে রাখা হয়েছে ফোকাস ধরে রাখার জন্য)
 */
const PasswordInputField = ({ label, name, value, show, setShow, placeholder, onChange }) => (
  <div className="space-y-1">
    <label className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest ml-1">{label}</label>
    <div className="relative">
      <input 
        type={show ? "text" : "password"}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white focus:border-indigo-500 outline-none transition-all pr-12" 
      />
      <button 
        type="button"
        onClick={() => setShow(!show)}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors text-xl"
      >
        {show ? <IoMdEyeOff /> : <IoMdEye />}
      </button>
    </div>
  </div>
);

const EditProfileModal = ({ isOpen, onClose, userData, userId }) => {
  const [formData, setFormData] = useState({
    fullName: userData?.fullName || "",
    userName: userData?.userName || "",
    bio: userData?.bio || "",
    about: userData?.about || "",
    location: userData?.location || "",
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  
  // শো-হাইড স্টেট
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const auth = getAuth();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const user = auth.currentUser;
      const userRef = doc(db, "users", userId);

      // ১. ফায়ারস্টোরে টেক্সট ডাটা আপডেট (পাসওয়ার্ড বাদে)
      const { oldPassword, newPassword, confirmPassword, ...textData } = formData;
      await updateDoc(userRef, textData);

      // ২. পাসওয়ার্ড আপডেট লজিক
      if (oldPassword && newPassword) {
        if (newPassword !== confirmPassword) {
          alert("নতুন পাসওয়ার্ড দুটি মেলেনি!");
          setLoading(false);
          return;
        }
        
        // বর্তমান পাসওয়ার্ড দিয়ে ভেরিফাই করা (Re-authentication)
        const credential = EmailAuthProvider.credential(user.email, oldPassword);
        await reauthenticateWithCredential(user, credential);
        
        // পাসওয়ার্ড বদলানো
        await updatePassword(user, newPassword);
      }
      
      alert("প্রোফাইল সফলভাবে আপডেট হয়েছে!");
      onClose();
      window.location.reload(); 
    } catch (error) {
      console.error(error);
      if (error.code === "auth/wrong-password") {
        alert("আপনার বর্তমান (Old) পাসওয়ার্ডটি ভুল!");
      } else {
        alert("আপডেট করতে সমস্যা হয়েছে! " + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
      <div className="bg-[#0f0f12] border border-white/10 w-full max-w-lg rounded-[2.5rem] p-6 md:p-10 shadow-2xl overflow-y-auto max-h-[90vh] custom-scrollbar">
        
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Edit Profile</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-all text-2xl">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* নাম ও ইউজারনেম */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-indigo-400 uppercase tracking-widest ml-1">Full Name</label>
              <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white focus:border-indigo-500 outline-none transition-all" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-indigo-400 uppercase tracking-widest ml-1">Username</label>
              <input type="text" name="userName" value={formData.userName} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white focus:border-indigo-500 outline-none transition-all" />
            </div>
          </div>

          {/* বায়ো */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-indigo-400 uppercase tracking-widest ml-1">Short Bio</label>
            <input type="text" name="bio" value={formData.bio} onChange={handleChange} placeholder="e.g. Full-stack Developer" className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white focus:border-indigo-500 outline-none transition-all" />
          </div>

          {/* অ্যাবাউট */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-indigo-400 uppercase tracking-widest ml-1">About Me</label>
            <textarea name="about" value={formData.about} onChange={handleChange} placeholder="Tell more about yourself..." className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white focus:border-indigo-500 outline-none transition-all h-28 resize-none" />
          </div>

          {/* লোকেশন */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-indigo-400 uppercase tracking-widest ml-1">Location</label>
            <input type="text" name="location" value={formData.location} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white focus:border-indigo-500 outline-none transition-all" />
          </div>

          {/* পাসওয়ার্ড সেকশন (সবার নিচে) */}
          <div className="pt-6 border-t border-white/10 space-y-4">
            <h3 className="text-sm font-bold text-gray-400 ml-1">Change Security Details</h3>
            
            <PasswordInputField 
              label="Current Password" name="oldPassword" value={formData.oldPassword} 
              show={showOld} setShow={setShowOld} placeholder="Verify current password" onChange={handleChange}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <PasswordInputField 
                label="New Password" name="newPassword" value={formData.newPassword} 
                show={showNew} setShow={setShowNew} placeholder="New password" onChange={handleChange}
              />
              <PasswordInputField 
                label="Confirm Password" name="confirmPassword" value={formData.confirmPassword} 
                show={showConfirm} setShow={setShowConfirm} placeholder="Repeat new password" onChange={handleChange}
              />
            </div>
          </div>

          {/* বাটনসমূহ */}
          <div className="flex gap-4 pt-4">
            <button type="button" onClick={onClose} className="flex-1 px-6 py-4 bg-white/5 rounded-2xl font-bold hover:bg-white/10 transition-all text-gray-300">
              Cancel
            </button>
            <button type="submit" disabled={loading} className="flex-1 px-6 py-4 bg-indigo-500 rounded-2xl font-bold shadow-lg shadow-indigo-500/20 hover:bg-indigo-600 transition-all disabled:opacity-50 text-white">
              {loading ? "Updating..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;