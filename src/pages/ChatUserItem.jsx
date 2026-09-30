import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate, useParams, Outlet } from "react-router-dom";

import { collection, query, where, or, getDocs, doc, onSnapshot } from "firebase/firestore";
import { ref, onValue } from "firebase/database";
import { auth, rtdb, db } from "../firebase/firebase";

import { AuthContext } from "../context/AuthContext";
import { ConnectUser } from "./ConnectUser";
import { generateChatId } from "../utils/generateChatId";


import { FaRegUserCircle, FaSearch, FaUserPlus, FaCommentDots, FaChevronRight, FaUserFriends, FaSpinner, FaCircle } from "react-icons/fa";
import { IoIosAlert, IoMdSettings } from "react-icons/io";



const ChatUserItem = ({ otherUid, activeChatUid, onClick }) => {
  const [userData, setUserData] = useState(null);
  const [lastMessage, setLastMessage] = useState("");
  const [unreadCount, setUnreadCount] = useState(0);
  const [isOnline, setIsOnline] = useState(false);
  const currentUid = auth.currentUser?.uid;

  useEffect(() => {
    if (!otherUid || !currentUid) return;

    // ১. Firestore listener: প্রোফাইল ডাটা
    const userRef = doc(db, "users", otherUid);
    const unsubUser = onSnapshot(userRef, (docSnap) => {
      if (docSnap.exists()) setUserData(docSnap.data());
    });

    // ২. RTDB listener: অনলাইন স্ট্যাটাস
    const statusRef = ref(rtdb, `status/${otherUid}/state`);
    const unsubStatus = onValue(statusRef, (snap) => {
      setIsOnline(snap.val() === "online");
    });

    // ৩. RTDB listener: লাস্ট মেসেজ এবং আনরিড কাউন্ট
    const chatId = generateChatId(currentUid, otherUid);
    const msgRef = ref(rtdb, `chats/${chatId}/messages`);
    const unsubMsgs = onValue(msgRef, (snapshot) => {
      if (snapshot.exists()) {
        const msgs = Object.values(snapshot.val());
        const lastMsgObj = msgs[msgs.length - 1];
        setLastMessage(lastMsgObj.text);

        // আনরিড মেসেজ বের করা (যেগুলো আমি পাঠাইনি এবং read: false)
        const unread = msgs.filter(m => m.senderId !== currentUid && m.read === false).length;
        setUnreadCount(unread);
      } else {
        setLastMessage("");
        setUnreadCount(0);
      }
    });

    return () => {
      unsubUser();
      unsubStatus();
      unsubMsgs();
    };
  }, [otherUid, currentUid]);

  if (!userData) return <div className="h-16 bg-gray-50 animate-pulse rounded-2xl mx-4 my-1" />;
  
 

  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-4 p-3.5 rounded-2xl cursor-pointer transition-all border mx-4 my-1 ${
        activeChatUid === otherUid 
        ? "bg-indigo-50 dark:bg-indigo-900/20 border-indigo-100 dark:border-indigo-500/30 shadow-sm" 
        : "hover:bg-gray-50 dark:hover:bg-slate-800 border-transparent bg-white dark:bg-slate-900 shadow-sm"
      }`}
    >
      {/* প্রোফাইল ফটো এবং অনলাইন ইন্ডিকেটর */}
      <div className="relative">
        {userData.profilePhoto ? (
          <img src={userData.profilePhoto} className="w-12 h-12 rounded-2xl object-cover shadow-sm dark:shadow-none" alt=""/>
        ) : (
          <div className="w-12 h-12 rounded-2xl bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
            {userData.fullName?.charAt(0)}
          </div>
        )}
        <div className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 border-2 border-white dark:border-slate-900 rounded-full ${isOnline ? "bg-green-500" : "bg-gray-300 dark:bg-slate-600"}`}></div>
      </div>

      {/* নাম এবং লাস্ট মেসেজ */}
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-center">
          <h4 className="font-bold text-gray-800 dark:text-slate-200 truncate text-sm">{userData.fullName}</h4>
          {unreadCount > 0 && (
            <span className="bg-indigo-600 dark:bg-indigo-500 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold">
              {unreadCount}
            </span>
          )}
        </div>
        <p className={`text-xs truncate mt-0.5 ${unreadCount > 0 ? "text-indigo-600 dark:text-indigo-400 font-bold" : "text-gray-400 dark:text-slate-500"}`}>
          {lastMessage || "Tap to open messages"}
        </p>
      </div>
      
      <FaChevronRight size={10} className={activeChatUid === otherUid ? "text-indigo-500 dark:text-indigo-400" : "text-gray-300 dark:text-slate-700"} />
    </div>
);
};

export default ChatUserItem;