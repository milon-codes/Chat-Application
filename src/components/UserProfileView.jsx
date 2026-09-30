import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { 
  IoMdPin, IoMdCheckmarkCircle, IoMdArrowRoundBack, 
  IoMdMail, IoMdCall, IoMdCalendar, IoMdInformationCircleOutline 
} from "react-icons/io";
import { IoIosChatbubbles } from "react-icons/io";

const UserProfileView = () => {
  const { uid } = useParams();
  const navigate = useNavigate();
  const [targetUser, setTargetUser] = useState(null);

  useEffect(() => {
    if (!uid) return;
    const userRef = doc(db, "users", uid);
    const unsub = onSnapshot(userRef, (docSnap) => {
      if (docSnap.exists()) {
        setTargetUser(docSnap.data());
      }
    });
    return () => unsub();
  }, [uid]);

  if (!targetUser) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#08080a]">
        <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#08080a] text-slate-900 dark:text-white p-4 md:p-10 font-sans selection:bg-indigo-500/30 transition-colors duration-500">
      
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Navigation */}
        <nav className="flex justify-between items-center bg-white/70 dark:bg-white/[0.03] backdrop-blur-2xl px-6 py-4 rounded-[2.5rem] border border-white dark:border-white/10 shadow-xl dark:shadow-none">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <IoIosChatbubbles className="text-2xl text-white" />
            </div>
            <span className="font-black text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-500 dark:from-white dark:to-gray-400">Chatly</span>
          </div>
          <button 
            onClick={() => navigate(-1)} 
            className="px-6 py-2.5 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/10 transition-all font-bold text-sm flex items-center gap-2 shadow-sm"
          >
            <IoMdArrowRoundBack /> Back
          </button>
        </nav>

        {/* Hero Section (Cover & Profile) */}
        <div className="bg-white dark:bg-white/[0.02] backdrop-blur-md rounded-[3rem] overflow-hidden border border-white dark:border-white/10 shadow-2xl dark:shadow-none relative">
          <div className="h-48 md:h-80 relative group">
            <img 
              src={targetUser?.coverPhoto || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop"} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
              alt="Cover" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-[#08080a] via-transparent to-transparent"></div>
          </div>

          <div className="px-6 md:px-12 pb-12 relative">
            <div className="flex flex-col md:flex-row items-center md:items-end gap-6 md:gap-10 -mt-24 md:-mt-32">
              <div className="relative group">
                <div className="absolute -inset-1.5 bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 rounded-[3.2rem] blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
                <div className="w-40 h-40 md:w-56 md:h-56 rounded-[3rem] p-1 bg-white dark:bg-[#0a0a0c] relative shadow-2xl">
                  <img 
                    src={targetUser?.profilePhoto || "https://via.placeholder.com/150"} 
                    className="w-full h-full rounded-[2.8rem] object-cover border-[4px] border-transparent" 
                    alt="Profile" 
                  />
                </div>
              </div>

              <div className="flex-1 text-center md:text-left space-y-3">
                <div className="flex items-center justify-center md:justify-start gap-3">
                  <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-slate-900 dark:text-white leading-none">{targetUser?.fullName}</h2>
                  <IoMdCheckmarkCircle className="text-indigo-500 text-3xl shrink-0" />
                </div>
                <p className="text-slate-500 dark:text-gray-400 font-bold text-lg md:text-xl italic max-w-xl line-clamp-2">"{targetUser?.bio || "Digital soul wandering in the void."}"</p>
                <div className="flex flex-wrap justify-center md:justify-start gap-6 pt-2">
                  <span className="text-indigo-600 dark:text-indigo-400 font-black text-lg tracking-widest uppercase">@{targetUser?.userName}</span>
                  <span className="flex items-center gap-2 text-slate-400 dark:text-gray-500 font-bold text-lg uppercase tracking-tighter">
                    <IoMdPin className="text-indigo-500" /> {targetUser?.location || "Earth"}
                  </span>
                </div>
              </div>

              <div className="flex gap-4 pb-2">
                <button 
                  onClick={() => window.location.href = `mailto:${targetUser.email}`}
                  className="px-10 py-5 bg-indigo-600 dark:bg-indigo-500 hover:bg-indigo-700 dark:hover:bg-indigo-600 text-white rounded-[2rem] font-black shadow-2xl shadow-indigo-500/40 active:scale-95 transition-all uppercase tracking-widest text-xs"
                >
                  Contact Me
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* About Section */}
          <div className="md:col-span-8">
            <div className="bg-white dark:bg-white/[0.03] p-10 rounded-[3rem] border border-slate-100 dark:border-white/10 shadow-sm transition-all hover:shadow-xl">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-indigo-50 dark:bg-indigo-500/10 rounded-2xl">
                  <IoMdInformationCircleOutline className="text-indigo-600 dark:text-indigo-400 text-3xl" />
                </div>
                <h3 className="text-slate-900 dark:text-indigo-400 font-black uppercase tracking-[0.3em] text-xs">The Biography</h3>
              </div>
              <p className="text-slate-600 dark:text-gray-300 text-xl leading-relaxed font-medium">
                {targetUser?.about || "This user prefers to keep their story a mystery for now. Stay curious!"}
              </p>
            </div>
          </div>

          {/* Contact & Meta Info */}
          <div className="md:col-span-4 space-y-6">
            <div className="bg-white dark:bg-white/[0.03] p-8 rounded-[3rem] border border-slate-100 dark:border-white/10 space-y-8 shadow-sm">
              <h4 className="text-slate-400 dark:text-gray-500 font-black text-[10px] uppercase tracking-[0.4em] mb-6 border-b border-slate-100 dark:border-white/5 pb-4">Social Connect</h4>
              
              <div className="flex items-center gap-5 group">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center text-indigo-600 dark:text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                  <IoMdMail size={22} />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] text-slate-400 dark:text-gray-500 font-black uppercase tracking-widest mb-0.5">Direct Email</p>
                  <p className="text-[13px] font-black truncate text-slate-800 dark:text-white">{targetUser.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-5 group">
                <div className="w-12 h-12 rounded-2xl bg-purple-50 dark:bg-purple-500/10 flex items-center justify-center text-purple-600 dark:text-purple-400 group-hover:bg-purple-600 group-hover:text-white transition-all duration-300">
                  <IoMdCall size={22} />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 dark:text-gray-500 font-black uppercase tracking-widest mb-0.5">Phone Line</p>
                  <p className="text-[13px] font-black text-slate-800 dark:text-white">{targetUser.phoneNumber || "Verified Account"}</p>
                </div>
              </div>

              <div className="flex items-center gap-5 group">
                <div className="w-12 h-12 rounded-2xl bg-pink-50 dark:bg-pink-500/10 flex items-center justify-center text-pink-600 dark:text-pink-400 group-hover:bg-pink-600 group-hover:text-white transition-all duration-300">
                  <IoMdCalendar size={22} />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 dark:text-gray-500 font-black uppercase tracking-widest mb-0.5">Life Milestone</p>
                  <p className="text-[13px] font-black text-slate-800 dark:text-white">{targetUser.age ? `${targetUser.age} Years Journey` : "Forever Young"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileView;