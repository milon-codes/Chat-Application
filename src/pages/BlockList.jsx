import React, { useEffect, useState } from "react";
import { ref, onValue, remove } from "firebase/database";
import { doc, getDoc } from "firebase/firestore";
import { auth, rtdb, db } from "../firebase/firebase";
import { FaUserSlash, FaChevronLeft, FaTrashAlt, FaSpinner, FaUserCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const BlockList = () => {
  const [blockedUsers, setBlockedUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null); // নির্দিষ্ট ইউজারের জন্য লোডিং
  const currentUid = auth.currentUser?.uid;
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUid) return;

    // ১. RTDB থেকে ব্লক করা UID-গুলো লিসেন করা
    const blockRef = ref(rtdb, `blocks/${currentUid}`);
    const unsub = onValue(blockRef, async (snapshot) => {
      if (snapshot.exists()) {
        const uids = Object.keys(snapshot.val());
        
        // ২. Firestore থেকে প্রত্যেক ইউজারের ডাটা (নাম, ছবি) নিয়ে আসা
        const userPromises = uids.map(async (uid) => {
          const userDoc = await getDoc(doc(db, "users", uid));
          if (userDoc.exists()) {
            return { id: uid, ...userDoc.data() };
          }
          return { id: uid, fullName: "Unknown User", profilePhoto: "" };
        });

        const users = await Promise.all(userPromises);
        setBlockedUsers(users);
      } else {
        setBlockedUsers([]);
      }
      setLoading(false);
    });

    return () => unsub();
  }, [currentUid]);

  // আনব্লক করার ফাংশন
  const handleUnblock = async (targetUid) => {
    if (!window.confirm("Do you want to unblock this user?")) return;
    
    setActionLoading(targetUid);
    try {
      // RTDB থেকে ব্লক ডাটা ডিলিট করা
      await remove(ref(rtdb, `blocks/${currentUid}/${targetUid}`));
      // চ্যাট লিস্টে অটোমেটিক ফিরে আসবে কারণ আমরা Chat.jsx এ লিসেন করছি
    } catch (error) {
      console.error("Unblock error:", error);
      alert("Failed to unblock!");
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col md:max-w-[450px] mx-auto border-x shadow-2xl">
      
      {/* Header */}
      <div className="bg-red-500 pt-8 pb-6 px-6 text-white rounded-b-[2.5rem] shadow-xl">
        <div className="flex items-center gap-4 mb-2">
          <button 
            onClick={() => navigate(-1)} 
            className="p-2 bg-white/20 rounded-xl hover:bg-white/30 transition-all"
          >
            <FaChevronLeft size={18}/>
          </button>
          <h1 className="text-xl font-bold tracking-tight">Blocked Users</h1>
        </div>
        <p className="text-red-100 text-xs ml-12 opacity-80 italic">
          Users you've blocked won't be able to message you.
        </p>
      </div>

      {/* Content */}
      <div className="flex-1 p-5 overflow-y-auto space-y-4">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <FaSpinner className="animate-spin mb-3" size={30} />
            <p className="text-sm font-bold uppercase tracking-widest">Loading List...</p>
          </div>
        ) : blockedUsers.length === 0 ? (
          <div className="text-center py-24 opacity-20">
            <FaUserSlash size={60} className="mx-auto mb-4 text-gray-400" />
            <p className="font-black text-sm uppercase tracking-[3px]">No Blocked Users</p>
          </div>
        ) : (
          blockedUsers.map((user) => (
            <div 
              key={user.id} 
              className="flex items-center justify-between bg-white p-4 rounded-3xl shadow-sm border border-gray-50 hover:border-red-100 transition-all group animate-in slide-in-from-bottom-2"
            >
              <div className="flex items-center gap-4">
                <div className="relative">
                  <img 
                    src={user.profilePhoto || "https://via.placeholder.com/150"} 
                    className="w-12 h-12 rounded-2xl object-cover shadow-sm border border-gray-100" 
                    alt="blocked-user"
                  />
                  <div className="absolute -top-1 -right-1 bg-red-500 text-white p-1 rounded-full border-2 border-white">
                    <FaUserSlash size={8} />
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 text-sm truncate max-w-[150px]">
                    {user.fullName}
                  </h4>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">
                    Blocked
                  </p>
                </div>
              </div>

              <button 
                onClick={() => handleUnblock(user.id)}
                disabled={actionLoading === user.id}
                className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-600 rounded-xl font-bold text-[10px] uppercase hover:bg-green-600 hover:text-white transition-all active:scale-95 disabled:opacity-50"
              >
                {actionLoading === user.id ? (
                  <FaSpinner className="animate-spin" />
                ) : (
                  <>
                    <FaUserCheck size={14} />
                    Unblock
                  </>
                )}
              </button>
            </div>
          ))
        )}
      </div>

      {/* Footer Info */}
      <div className="p-6 text-center">
        <p className="text-[10px] text-gray-400 font-medium uppercase tracking-widest">
          App version 1.0.0 • Secure Chat
        </p>
      </div>
    </div>
  );
};

export default BlockList;