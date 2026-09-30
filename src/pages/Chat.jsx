import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate, useParams, Outlet } from "react-router-dom";

import { collection, query, where, or, getDocs, doc, onSnapshot } from "firebase/firestore";
import { ref, onValue } from "firebase/database";
import { auth, rtdb, db } from "../firebase/firebase";

import { AuthContext } from "../context/AuthContext";
import { ConnectUser } from "./ConnectUser";
import { generateChatId } from "../utils/generateChatId";
import Loader from "../components/Loader";

import { FaRegUserCircle, FaSearch, FaUserPlus, FaCommentDots, FaChevronRight, FaUserFriends, FaSpinner, FaCircle } from "react-icons/fa";
import { IoIosAlert, IoMdSettings } from "react-icons/io";

import ChatUserItem from "./ChatUserItem";


const Chat = () => {
  const { user, loading } = useContext(AuthContext);
  const { uid: activeChatUid } = useParams();
  const navigate = useNavigate();
  const currentUid = auth.currentUser?.uid;

  const [chats, setChats] = useState([]);
  const [blockedUids, setBlockedUids] = useState([]); // ব্লক লিস্টের জন্য স্টেট
  const [searchText, setSearchText] = useState("");
  const [foundUser, setFoundUser] = useState(null);
  const [error, setError] = useState("");
  const [isloading, setIsLoading] = useState(false);
  const [connectLoading, setConnectLoading] = useState(false); // কানেক্ট লোডিং
  const [received, setReceived] = useState([]);

console.log("foundUser", foundUser)
console.log("User", user)

  // ১. ইনবক্স বা চ্যাট লিস্ট লোড করা
  useEffect(() => {
    if (!currentUid) return;
    const inboxRef = ref(rtdb, `userChats/${currentUid}`);
    const unsub = onValue(inboxRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        setChats(Object.keys(data).map(uid => ({ otherUid: uid })));
      } else {
        setChats([]);
      }
    });
    return () => unsub();
  }, [currentUid]);

  // ২. ব্লক লিস্ট লিসেন করা (যাতে ব্লক করা ইউজার লিস্টে না থাকে)
  useEffect(() => {
    if (!currentUid) return;
    const blockRef = ref(rtdb, `blocks/${currentUid}`);
    const unsub = onValue(blockRef, (snapshot) => {
      if (snapshot.exists()) {
        setBlockedUids(Object.keys(snapshot.val()));
      } else {
        setBlockedUids([]);
      }
    });
    return () => unsub();
  }, [currentUid]);

  // ৩. রিকোয়েস্ট কাউন্ট লিসেন করা
  useEffect(() => {
    if (!currentUid) return;
    const receivedRef = ref(rtdb, `requests/received/${currentUid}`);
    const unsub = onValue(receivedRef, (snapshot) => {
      if (snapshot.exists()) {
        setReceived(Object.keys(snapshot.val()));
      } else {
        setReceived([]);
      }
    });
    return () => unsub();
  }, [currentUid]);

  // ৪. ইউজার সার্চ লজিক
  const handleSearch = async (e) => {
    e.preventDefault();
    const term = searchText.trim();
    if (!term) return;
    setIsLoading(true); setError(""); setFoundUser(null);
    try {
      const usersRef = collection(db, "users");
      const q = query(usersRef, or(
        where("fullName", "==", term),
        where("email", "==", term),
        where("userName", "==", term)
      ));
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        setError("User not found!");
      } else {
        let userDataResult = null;
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          if (data.email !== user.email) {
            userDataResult = { uid: doc.id, ...data };
          }
        });
        userDataResult ? setFoundUser(userDataResult) : setError("You cannot search for yourself!");
      }
    } catch (err) {
      setError("Search failed.");
    } finally {
      setIsLoading(false);
    }
  };

  // ৫. কানেক্ট ইউজার লজিক উইথ লোডিং
  const handleConnect = async (targetUser) => {
    setConnectLoading(true);
    try {
      await ConnectUser(auth.currentUser, targetUser, user);
      setFoundUser(null);
      setSearchText("");
    } catch (err) {
      setError("Failed to connect.");
    } finally {
      setConnectLoading(false);
    }
  };

  // চ্যাট লিস্ট ফিল্টার করা (ব্লক করা ইউজারদের বাদ দেওয়া)
  const visibleChats = chats.filter(chat => !blockedUids.includes(chat.otherUid));
  


  return (
  <div className="flex h-screen bg-white dark:bg-[#020617] md:bg-gray-50 dark:md:bg-[#020617] overflow-hidden text-gray-800 dark:text-slate-200 transition-colors duration-500">
    
    {/* Sidebar */}
    <div className={`${activeChatUid ? "hidden md:flex" : "flex"} w-full md:w-[380px] flex-col bg-white dark:bg-[#020617] border-r border-gray-200 dark:border-slate-800 relative`}>
      
      {/* Header */}
      <div className="p-5 bg-indigo-600 dark:bg-indigo-600/10 text-white rounded-b-3xl md:rounded-none shadow-lg dark:shadow-none transition-all">
        <div className="flex items-center justify-between mb-5">
          <Link to="/profile" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-xl bg-white/20 dark:bg-indigo-500/20 flex items-center justify-center border border-white/30 dark:border-indigo-500/30 overflow-hidden shadow-inner group-hover:scale-105 transition-transform">
              {user?.profilePhoto ? (
                <img src={user.profilePhoto} className="w-full h-full object-cover" alt="Profile"/>
              ) : (
                <FaRegUserCircle size={24} className="dark:text-indigo-400" />
              )}
            </div>
            <div>
              <h2 className="font-bold text-md truncate max-w-[150px] dark:text-white">
                {user?.fullName || "My Chats"}
              </h2>
              <p className="text-sm text-indigo-100 dark:text-indigo-400 font-bold opacity-80">
                @{user?.userName}
              </p>
            </div>
          </Link>

          <div className="relative group">
            <button onClick={() => navigate("/friends")} className="flex flex-col items-center gap-1 text-indigo-100 dark:text-slate-400 hover:text-white dark:hover:text-indigo-400 transition-all">
              <FaUserFriends size={22} className="group-active:scale-90 transition-transform"/>
              <span className="text-[9px] font-black uppercase">Friends</span>
            </button>
            {received.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] flex items-center justify-center rounded-full border-2 border-indigo-600 dark:border-[#020617] animate-bounce font-black">
                {received.length}
              </span>
            )}
          </div>
        </div>

        {/* Search Input */}
        <form onSubmit={handleSearch} className="relative flex items-center gap-2">
          <div className="relative flex-1">
            <FaSearch className={`absolute left-4 top-1/2 -translate-y-1/2 text-sm ${loading ? "animate-spin text-white" : "text-indigo-200 dark:text-indigo-400/60"}`} />
            <input
              type="text"
              placeholder="Search by name..."
              className="w-full pl-11 pr-4 py-2.5 text-sm bg-white/10 dark:bg-slate-900/50 border border-white/20 dark:border-slate-700/50 rounded-xl text-white outline-none placeholder:text-indigo-100 dark:placeholder:text-slate-500 focus:bg-white/20 dark:focus:border-indigo-500 transition-all shadow-inner"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              disabled={loading}
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="bg-white dark:bg-indigo-600 text-indigo-600 dark:text-white px-4 py-2.5 rounded-xl font-bold text-xs hover:bg-indigo-50 dark:hover:bg-indigo-700 active:scale-95 transition-all disabled:opacity-50 min-w-[80px] shadow-md"
          >
            {loading ? <FaSpinner className="animate-spin mx-auto" /> : "SEARCH"}
          </button>
        </form>
      </div>

      {/* Chat List & Search Results */}
      <div className="flex-1 overflow-y-auto pb-24 custom-scrollbar bg-white dark:bg-[#020617]">
        {error && (
          <div className="m-4 p-3 text-xs text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-500/10 rounded-lg border border-red-100 dark:border-red-500/20">
            {error}
          </div>
        )}

        {foundUser && (
          <div className="m-4 p-4 bg-indigo-50 dark:bg-indigo-500/5 rounded-2xl border border-indigo-100 dark:border-indigo-500/20 flex items-center justify-between animate-in zoom-in-95 duration-200">
            <div className="flex items-center gap-3">
              <img src={foundUser.profilePhoto || "https://via.placeholder.com/150"} className="w-11 h-11 rounded-xl object-cover shadow-sm border-2 border-white dark:border-slate-800" alt="user photo"/>
              <div>
                <h4 className="font-bold text-sm text-gray-800 dark:text-slate-200">{foundUser.fullName}</h4>
                <p className="text-[10px] text-gray-500 dark:text-slate-500 uppercase font-bold">@{foundUser.userName}</p>
              </div>
            </div>
            <button 
              onClick={() => handleConnect(foundUser)} 
              disabled={connectLoading}
              className="p-3 bg-indigo-600 text-white rounded-xl shadow-md active:scale-90 transition-all disabled:bg-gray-400 shadow-indigo-500/20"
            >
              {connectLoading ? <FaSpinner className="animate-spin" /> : <FaUserPlus size={16} />}
            </button>
          </div>
        )}

        <div className="px-6 pt-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[11px] font-black text-gray-400 dark:text-slate-600 uppercase tracking-[2px]">Messages</h3>
            <div className="h-[1px] flex-1 bg-gray-100 dark:bg-slate-800 ml-4"></div>
          </div>
          
          <div className="space-y-1">
            {visibleChats.length === 0 && !foundUser ? (
              <div className="text-center py-24 opacity-20 dark:opacity-10">
                <FaCommentDots size={50} className="mx-auto mb-3" />
                <p className="text-xs italic font-bold">No conversations found</p>
              </div>
            ) : (
              visibleChats.map((chat) => (
                <ChatUserItem 
                  key={chat.otherUid} 
                  otherUid={chat.otherUid} 
                  activeChatUid={activeChatUid}
                  onClick={() => navigate(`/chat/${chat.otherUid}`)}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>

    {/* Main Content Area */}
    <div className={`${!activeChatUid ? "hidden md:flex" : "flex"} flex-1 flex-col bg-gray-50 dark:bg-[#0f172a] transition-colors duration-500`}>
      {activeChatUid ? (
        <Outlet />
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center p-6">
          <div className="w-24 h-24 bg-white dark:bg-slate-800 rounded-[2.5rem] shadow-xl dark:shadow-none border dark:border-slate-700 flex items-center justify-center mb-6 text-indigo-500 animate-pulse">
            <FaCommentDots size={40} />
          </div>
          <h2 className="text-2xl font-black text-gray-800 dark:text-white tracking-tight">Open a Chat</h2>
          <p className="text-sm text-gray-400 dark:text-slate-500 mt-2 font-medium max-w-[250px] text-center">
            Select a friend from the list to start messaging securely
          </p>
        </div>
      )}
    </div>
    
  </div>
);
};

export default Chat;
