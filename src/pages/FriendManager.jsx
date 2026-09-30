import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { ref, onValue, update, get } from "firebase/database";
import { doc, getDoc } from "firebase/firestore";
import { auth, rtdb, db } from "../firebase/firebase";

import { FaUserFriends, FaUserPlus, FaPaperPlane, FaCheck, FaTimes, FaChevronLeft, FaCommentAlt, FaSpinner } from "react-icons/fa";


const FriendManager = () => {
  const [activeTab, setActiveTab] = useState("friends");
  const [friends, setFriends] = useState([]);
  const [received, setReceived] = useState([]);
  const [sent, setSent] = useState([]);
  const [myProfile, setMyProfile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  
  console.log("r",friends)
  console.log(friends)

  const currentUid = auth.currentUser?.uid;
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUid) return;

    // ১. নিজের প্রোফাইল ডাটা Firestore থেকে আনা
    const fetchMyData = async () => {
      const myDoc = await getDoc(doc(db, "users", currentUid));
      if (myDoc.exists()) setMyProfile(myDoc.data());
    };
    fetchMyData();

    // ২. রিয়েল-টাইম লিস্ট লোড করা
    const unsubFriends = onValue(ref(rtdb, `userChats/${currentUid}`), (snap) => {
      setFriends(snap.exists() ? Object.entries(snap.val()) : []);
    });

    const unsubReceived = onValue(ref(rtdb, `requests/received/${currentUid}`), (snap) => {
      setReceived(snap.exists() ? Object.entries(snap.val()) : []);
    });

    const unsubSent = onValue(ref(rtdb, `requests/sent/${currentUid}`), (snap) => {
      setSent(snap.exists() ? Object.entries(snap.val()) : []);
    });

    return () => {
      unsubFriends();
      unsubReceived();
      unsubSent();
    };
  }, [currentUid]);

  // রিকোয়েস্ট এক্সেপ্ট করার লজিক (আপনার কনসোল ডাটা অনুযায়ী ফিক্সড)
  const acceptRequest = async (senderId) => {
  // ১. চেক করা আইডিতে কোনো সমস্যা আছে কি না
  if (!currentUid || !senderId) {
    console.error("UID missing! Current:", currentUid, "Sender:", senderId);
    return;
  }
  
  if (isProcessing) return;
  setIsProcessing(true);

  try {
    // ২. সরাসরি রিদ-টাইম ডাটাবেজ থেকে ওই রিকোয়েস্টের স্ন্যাপশট নেওয়া
    const requestPath = `requests/received/${currentUid}/${senderId}`;
    const snap = await get(ref(rtdb, requestPath));

    if (!snap.exists()) {
      console.log("Database path check failed:", requestPath);
      alert("রিকোয়েস্টটি ডাটাবেজে খুঁজে পাওয়া যাচ্ছে না!");
      setIsProcessing(false);
      return;
    }

    const requestData = snap.val();

    // ৩. Firestore থেকে ডাটা ফেচ করা (বিকল্প হিসেবে রিকোয়েস্ট ডাটা রাখা হয়েছে)
    const senderDoc = await getDoc(doc(db, "users", senderId));
    const myDoc = await getDoc(doc(db, "users", currentUid));

    const sName = senderDoc.exists() ? senderDoc.data().fullName : (requestData.name || "User");
    const sPhoto = senderDoc.exists() ? senderDoc.data().profilePhoto : (requestData.photo || "");
    const mName = myDoc.exists() ? myDoc.data().fullName : (myProfile?.fullName || "Me");
    const mPhoto = myDoc.exists() ? myDoc.data().profilePhoto : (myProfile?.profilePhoto || "");

    const updates = {};
    
    // ৪. userChats পাথ (এটাই মেইন কানেকশন)
    updates[`userChats/${currentUid}/${senderId}`] = { 
      fullName: sName, 
      profilePhoto: sPhoto, 
      connectedAt: Date.now() 
    };
    updates[`userChats/${senderId}/${currentUid}`] = { 
      fullName: mName, 
      profilePhoto: mPhoto, 
      connectedAt: Date.now() 
    };

    // ৫. রিকোয়েস্ট ডিলিট করা
    updates[`requests/received/${currentUid}/${senderId}`] = null;
    updates[`requests/sent/${senderId}/${currentUid}`] = null;

    console.log("Final Updates Object:", updates); // কনসোলে চেক করার জন্য

    await update(ref(rtdb), updates);
    alert("অভিনন্দন! এখন আপনি ফ্রেন্ড লিস্ট চেক করুন।");

  } catch (error) {
    console.error("Accept process failed:", error);
    alert("Error: " + error.message);
  } finally {
    setIsProcessing(false);
  }
};

  const cancelRequest = async (targetId, type) => {
    const updates = {};
    if (type === "sent") {
      updates[`requests/sent/${currentUid}/${targetId}`] = null;
      updates[`requests/received/${targetId}/${currentUid}`] = null;
    } else {
      updates[`requests/received/${currentUid}/${targetId}`] = null;
      updates[`requests/sent/${targetId}/${currentUid}`] = null;
    }
    await update(ref(rtdb), updates);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col md:max-w-[450px] mx-auto border-x shadow-2xl relative">
      
      {/* Header */}
      <div className="bg-indigo-600 pt-10 pb-8 px-6 text-white rounded-b-[2.5rem] shadow-xl">
        <div className="flex items-center justify-between mb-8">
          <button onClick={() => navigate("/chat")} className="p-2.5 bg-white/20 rounded-2xl hover:bg-white/30 transition-all">
            <FaChevronLeft size={18}/>
          </button>
          <h1 className="text-xl font-bold tracking-tight">Social Network</h1>
          <div className="w-12 h-12 bg-white/20 rounded-2xl border-2 border-white/30 overflow-hidden shadow-inner">
            <img 
               src={myProfile?.profilePhoto || "https://via.placeholder.com/150"} 
               alt="me" 
               className="w-full h-full object-cover" 
               onError={(e) => e.target.src = "https://via.placeholder.com/150"}
            />
          </div>
        </div>
        
        <div className="flex bg-indigo-700/40 p-1.5 rounded-3xl backdrop-blur-md border border-white/10">
          <TabItem label="Friends" count={friends.length} active={activeTab === "friends"} onClick={() => setActiveTab("friends")} icon={<FaUserFriends/>}/>
          <TabItem label="Requests" count={received.length} active={activeTab === "received"} onClick={() => setActiveTab("received")} icon={<FaUserPlus/>}/>
          <TabItem label="Sent" count={sent.length} active={activeTab === "sent"} onClick={() => setActiveTab("sent")} icon={<FaPaperPlane/>}/>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 p-5 overflow-y-auto space-y-4 pb-12">
        {/* Friends Tab */}
        {activeTab === "friends" && friends.map(([id, data]) => (
          <div key={id} className="flex items-center justify-between bg-white p-4 rounded-[2rem] shadow-sm border border-gray-50 hover:border-indigo-100 transition-all">
            <Link to={`/profile/${id}`} className="flex items-center gap-4">
               <img 
                  src={data.profilePhoto || "https://via.placeholder.com/150"} 
                  className="w-14 h-14 rounded-2xl object-cover shadow-sm ring-2 ring-gray-50" 
                  alt=""
                  onError={(e) => e.target.src = "https://via.placeholder.com/150"}
               />
               <div>
                 <h4 className="font-bold text-gray-800 text-sm">{data.fullName || "Friend"}</h4>
                 <p className="text-[10px] text-green-500 font-black uppercase tracking-widest">Connected</p>
               </div>
            </Link>
            <button onClick={() => navigate(`/chat/${id}`)} className="p-3.5 bg-indigo-50 text-indigo-600 rounded-2xl hover:bg-indigo-600 hover:text-white transition-all">
              <FaCommentAlt size={16}/>
            </button>
          </div>
        ))}

        {/* Received Tab (এখানেই আপনার ছবির সমস্যা ছিল) */}
       {/* Received Requests Tab */}
{activeTab === "received" && received.map(([id, data]) => (
  <div key={id} className="flex items-center justify-between bg-white p-4 rounded-[2rem] shadow-sm border border-indigo-100 animate-in slide-in-from-right-5">
    <Link to={`/profile/${id}`} className="flex items-center gap-3">
       <img 
          src={data.profilePhoto || "https://via.placeholder.com/150"} 
          className="w-14 h-14 rounded-2xl object-cover border-2 border-white shadow-md" 
          alt="User"
          onError={(e) => { e.target.src = "https://via.placeholder.com/150"; }} 
       />
       <div>
         <h4 className="font-bold text-gray-800 text-sm">
           {data.fullName || "New User"}
         </h4>
         <p className="text-[10px] text-indigo-500 font-bold uppercase tracking-widest">Received Request</p>
       </div>
    </Link>
    <div className="flex gap-2">
      <button 
        onClick={() => acceptRequest(id)} 
        disabled={isProcessing}
        className="p-4 bg-indigo-600 text-white rounded-2xl shadow-lg shadow-indigo-100 active:scale-95"
      >
        {isProcessing ? <FaSpinner className="animate-spin" size={14}/> : <FaCheck size={14}/>}
      </button>
      <button onClick={() => cancelRequest(id, "received")} className="p-4 bg-gray-100 text-gray-400 rounded-2xl hover:text-red-500 hover:bg-red-50">
        <FaTimes size={14}/>
      </button>
    </div>
  </div>
))}

{/* Sent Requests Tab */}
{activeTab === "sent" && sent.map(([id, data]) => (
  <div key={id} className="flex items-center justify-between bg-white p-4 rounded-[2rem] shadow-sm border border-gray-50 opacity-90">
    <div className="flex items-center gap-3">
       <img 
          src={data.profilePhoto || "https://via.placeholder.com/150"} 
          className="w-12 h-12 rounded-2xl object-cover grayscale opacity-70" 
          alt="Sent to"
          onError={(e) => { e.target.src = "https://via.placeholder.com/150"; }}
       />
       <div>
         <h4 className="font-bold text-gray-500 text-sm">{data.fullName || "User"}</h4>
         <p className="text-[10px] text-gray-400 font-bold uppercase">Pending Response</p>
       </div>
    </div>
    <button onClick={() => cancelRequest(id, "sent")} className="px-5 py-2.5 text-[10px] font-black text-red-500 bg-red-50 rounded-xl border border-red-100 active:scale-95 transition-all">Cancel</button>
  </div>
))}

        {/* Empty State */}
        {((activeTab === "friends" && friends.length === 0) || (activeTab === "received" && received.length === 0) || (activeTab === "sent" && sent.length === 0)) && (
          <div className="text-center py-24 opacity-20">
            <FaUserFriends size={60} className="mx-auto mb-4" />
            <p className="font-black text-xs uppercase tracking-[5px]">No Activity Found</p>
          </div>
        )}
      </div>
    </div>
  );
};

const TabItem = ({ label, count, active, onClick, icon }) => (
  <button onClick={onClick} className={`flex-1 flex flex-col items-center py-3.5 rounded-2xl transition-all duration-300 ${active ? "bg-white text-indigo-600 shadow-xl scale-105" : "text-white opacity-60 hover:opacity-100"}`}>
    <div className="flex items-center gap-2 mb-1">
      {icon}
      <span className="text-[10px] font-black uppercase tracking-tighter">{label}</span>
    </div>
    <span className={`text-[10px] px-3 py-0.5 rounded-full font-bold ${active ? "bg-indigo-600 text-white" : "bg-white/20 text-white"}`}>{count}</span>
  </button>
);

export default FriendManager;