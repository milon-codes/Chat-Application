import React, { useEffect,useContext, useState, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ref, onValue, push, set, update, serverTimestamp as rtdbTimestamp } from "firebase/database";
import { doc, getDoc } from "firebase/firestore"; 
import { auth, rtdb, db } from "../firebase/firebase";
import { generateChatId } from "../utils/generateChatId";
//import EmojiPicker from "emoji-picker-react";
import { ThemeContext } from "../context/ThemeContext";
import { FaPaperPlane, FaChevronLeft, FaTrash, FaEdit, FaImage, FaFileAlt, FaTimes, FaUserSlash } from "react-icons/fa";
import { IoIosSunny, IoIosMoon } from "react-icons/io";



const ChatWindow = () => {
  const { uid: otherUid } = useParams();
  const navigate = useNavigate();
  const currentUser = auth.currentUser;
const { darkMode, setDarkMode } = useContext(ThemeContext); 
  const [chatUser, setChatUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [otherStatus, setOtherStatus] = useState("offline");
  
  const [editingMsgId, setEditingMsgId] = useState(null);
  const [isUploading, setIsUploading] = useState(false);


  // ব্লক স্টেট
  const [amIBlocked, setAmIBlocked] = useState(false);
  const [didIBlock, setDidIBlock] = useState(false);
  
  
  const bottomRef = useRef(null);
  const chatId = generateChatId(currentUser.uid, otherUid);

  const CLOUD_NAME = "da65g97jk";
  const UPLOAD_PRESET = "chatly_preset";

  useEffect(() => {
    if (!otherUid || !currentUser) return;

    // ১. ইউজার ডাটা আনা
    const fetchUserData = async () => {
      const userDoc = await getDoc(doc(db, "users", otherUid));
      if (userDoc.exists()) setChatUser(userDoc.data());
    };
    fetchUserData();

    // ২. অনলাইন স্ট্যাটাস
    onValue(ref(rtdb, `status/${otherUid}`), (snapshot) => {
      setOtherStatus(snapshot.val()?.state || "offline");
    });

    // ৩. টাইপিং স্ট্যাটাস
    onValue(ref(rtdb, `typing/${chatId}/${otherUid}`), (snapshot) => {
      setIsTyping(snapshot.val() || false);
    });

    // ৪. ব্লক চেক (Real-time)
    // চেক করা আমি তাকে ব্লক করেছি কি না
    onValue(ref(rtdb, `blocks/${currentUser.uid}/${otherUid}`), (snap) => {
      setDidIBlock(snap.exists());
    });
    // চেক করা সে আমাকে ব্লক করেছে কি না
    onValue(ref(rtdb, `blocks/${otherUid}/${currentUser.uid}`), (snap) => {
      setAmIBlocked(snap.exists());
    });

    // ৫. মেসেজ লোড ও সিন আপডেট
    const msgRef = ref(rtdb, `chats/${chatId}/messages`);
    const unsubMsgs = onValue(msgRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const updates = {};
        
        const formattedMsgs = Object.entries(data).map(([msgId, msgVal]) => {
          if (msgVal.senderId !== currentUser.uid && msgVal.read === false) {
            updates[`chats/${chatId}/messages/${msgId}/read`] = true;
          }
          return { ...msgVal, id: msgId };
        });

        if (Object.keys(updates).length > 0) {
          update(ref(rtdb), updates);
        }

        const sortedMsgs = formattedMsgs.sort((a, b) => a.createdAt - b.createdAt);
        setMessages(sortedMsgs);
      } else {
        setMessages([]);
      }
    });

    return () => unsubMsgs();
  }, [otherUid, chatId, currentUser.uid]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleInputChange = (e) => {
    const val = e.target.value;
    setText(val);
    const myTypingRef = ref(rtdb, `typing/${chatId}/${currentUser.uid}`);
    set(myTypingRef, val.length > 0);
    setTimeout(() => set(myTypingRef, false), 3000);
  };

  const handleFileUpload = async (e) => {
    if (didIBlock || amIBlocked) return alert("Cannot send files in a blocked chat.");
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/auto/upload`, {
        method: "POST",
        body: formData
      });
      const data = await res.json();

      if (data.secure_url) {
        await push(ref(rtdb, `chats/${chatId}/messages`), {
          senderId: currentUser.uid,
          fileUrl: data.secure_url,
          fileType: file.type.startsWith("image") ? "image" : "file",
          fileName: file.name,
          createdAt: rtdbTimestamp(),
          read: false
        });
      }
    } catch (err) {
      alert("Upload failed!");
    } finally {
      setIsUploading(false);
    }
  };

  const sendMessage = async () => {
    if (!text.trim()) return;
    if (didIBlock) return alert("You blocked this user. Unblock to chat.");
    if (amIBlocked) return alert("You are blocked by this user.");

    set(ref(rtdb, `typing/${chatId}/${currentUser.uid}`), false);

    if (editingMsgId) {
      await update(ref(rtdb, `chats/${chatId}/messages/${editingMsgId}`), {
        text: text.trim(),
        isEdited: true,
        editedAt: rtdbTimestamp()
      });
      setEditingMsgId(null);
    } else {
      await push(ref(rtdb, `chats/${chatId}/messages`), {
        senderId: currentUser.uid,
        text: text.trim(),
        createdAt: rtdbTimestamp(),
        read: false
      });
    }
    setText("");
  };

  const toggleBlock = async () => {
    const confirmMsg = didIBlock ? "Unblock this user?" : "Block this user?";
    if (window.confirm(confirmMsg)) {
      const blockPath = `blocks/${currentUser.uid}/${otherUid}`;
      await set(ref(rtdb, blockPath), didIBlock ? null : true);
    }
  };

  const deleteMessage = (msgId) => {
    if (window.confirm("Delete this message for everyone?")) {
      set(ref(rtdb, `chats/${chatId}/messages/${msgId}`), null);
    }
  };

  const formatTime = (ts) => {
    if (!ts) return "Just now";
    const date = new Date(ts);
    if (isNaN(date.getTime())) return "Just now";
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };


return (
  <div className={`flex flex-col h-screen transition-all duration-500 font-sans
    ${darkMode ? "bg-[#020617] text-gray-100" : "bg-[#f4f7ff] text-slate-800"}`}>

    {/* --- প্রিমিয়াম হেডার --- */}
    <div className={`p-4 border-b flex items-center justify-between sticky top-0 z-50 backdrop-blur-md transition-colors duration-500
      ${darkMode ? "bg-[#020617]/80 border-slate-800 shadow-2xl" : "bg-white/80 border-slate-200 shadow-sm"}`}>
      
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate("/chat")}
          className={`md:hidden p-2 rounded-xl transition-all ${darkMode ? "hover:bg-slate-800 text-slate-400" : "hover:bg-slate-100 text-slate-600"}`}
        >
          <FaChevronLeft size={18} />
        </button>

        <Link to={`/profile/${otherUid}`} className="relative group">
          {/* প্রোফাইল গ্লো ইফেক্ট */}
          <div className="absolute -inset-1 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-2xl blur-sm opacity-0 group-hover:opacity-40 transition-all duration-500" />
          <img
            src={chatUser?.profilePhoto || "https://via.placeholder.com/150"}
            className="w-11 h-11 rounded-2xl object-cover shadow-md border-2 border-white dark:border-slate-800 relative z-10"
            alt="profile"
          />
          <span className={`absolute -bottom-0.5 -right-0.5 w-4 h-4 border-2 rounded-full z-20 transition-colors
            ${darkMode ? "border-slate-900" : "border-white"}
            ${otherStatus === "online" ? "bg-green-500 animate-pulse" : "bg-gray-400"}`}>
          </span>
        </Link>

        <div className="flex flex-col">
          <Link
            to={`/profile/${otherUid}`}
            className={`font-black text-sm md:text-base tracking-tight transition-colors hover:text-indigo-500
              ${darkMode ? "text-white" : "text-slate-800"}`}
          >
            {chatUser?.fullName || "Loading..."}
          </Link>
          <div className="flex items-center gap-1.5">
            <span className={`text-[9px] font-black uppercase tracking-widest
              ${otherStatus === "online" ? "text-green-500" : "text-slate-500"}`}>
              {otherStatus === "online" ? "Active Now" : "Offline"}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-3">
        {/* ব্লক বাটন */}
        <button
          onClick={toggleBlock}
          title={didIBlock ? "Unblock" : "Block"}
          className={`p-2.5 rounded-xl transition-all group active:scale-90
            ${didIBlock ? "bg-red-500 text-white shadow-lg shadow-red-500/30" : "bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-red-500"}`}
        >
          <FaUserSlash size={16} />
        </button>

        {/* ডার্ক মোড টগল (যদি প্রয়োজন হয়) */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2.5 rounded-xl transition-all bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-indigo-500 active:scale-90">
          {darkMode ? <IoIosSunny size={18} /> : <IoIosMoon size={18} />}
        </button>
      </div>
    </div>

    {/* --- মেসেজ এরিয়া --- */}
    <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 custom-scrollbar">
      {messages.map((m) => {
        const isMe = m.senderId === currentUser.uid;
        return (
          <div key={m.id} className={`flex ${isMe ? "justify-end" : "justify-start"} items-end gap-3 group animate-in slide-in-from-bottom-2 duration-300`}>
            
            <div className={`flex flex-col ${isMe ? "items-end" : "items-start"} max-w-[80%] md:max-w-[70%]`}>
              <div className="flex items-center gap-2 group/msg">
                {isMe && (
                  <div className="opacity-0 group-hover:opacity-100 flex items-center gap-1 transition-all duration-300">
                    {!m.fileUrl && (
                      <button onClick={() => { setEditingMsgId(m.id); setText(m.text); }} className="p-2 text-slate-400 hover:text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 rounded-xl transition-all">
                        <FaEdit size={12} />
                      </button>
                    )}
                    <button onClick={() => deleteMessage(m.id)} className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-all">
                      <FaTrash size={12} />
                    </button>
                  </div>
                )}

                <div className={`px-5 py-3 rounded-[1.5rem] shadow-sm relative overflow-hidden transition-all duration-300
                  ${isMe
                    ? "bg-gradient-to-tr from-indigo-600 to-purple-600 text-white rounded-br-none shadow-indigo-500/20"
                    : `${darkMode ? "bg-slate-800 text-slate-200" : "bg-white text-slate-700"} rounded-bl-none border border-slate-100 dark:border-slate-700`
                  }`}
                >
                  {m.fileUrl ? (
                    m.fileType === "image" ? (
                      <img
                        src={m.fileUrl}
                        className="max-h-72 w-full object-cover rounded-xl cursor-pointer hover:scale-[1.02] transition-transform duration-500"
                        alt="Sent"
                        onClick={() => window.open(m.fileUrl)}
                      />
                    ) : (
                      <a href={m.fileUrl} target="_blank" rel="noreferrer" className="flex items-center gap-3 p-2 text-xs md:text-sm bg-black/10 rounded-xl">
                        <FaFileAlt className="text-xl" /> {m.fileName || "View Attachment"}
                      </a>
                    )
                  ) : (
                    <p className="text-sm md:text-[15px] leading-relaxed font-medium whitespace-pre-wrap break-words">{m.text}</p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 mt-1.5 px-1">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">
                  {formatTime(m.createdAt)} {m.isEdited && "• Edited"}
                </span>
                {isMe && (
                  <span className={`text-[10px] font-black ${m.read ? "text-indigo-500" : "text-slate-300"}`}>
                    {m.read ? "✓✓ SEEN" : "✓ SENT"}
                  </span>
                )}
              </div>
            </div>
          </div>
        );
      })}

      {/* Typing Indicator */}
      {isTyping && !amIBlocked && !didIBlock && (
        <div className="flex items-center gap-2 animate-pulse">
          <div className={`px-4 py-3 rounded-2xl rounded-bl-none flex gap-1 ${darkMode ? "bg-slate-800" : "bg-slate-200"}`}>
            <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce"></div>
            <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
            <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce [animation-delay:0.4s]"></div>
          </div>
        </div>
      )}

      {isUploading && (
        <div className="flex items-center gap-2 ml-2">
          <p className="text-[10px] text-indigo-500 font-black animate-pulse italic tracking-widest uppercase">Uploading file...</p>
        </div>
      )}

      <div ref={bottomRef} />
    </div>

    {/* --- প্রিমিয়াম ইনপুট বক্স --- */}
    <div className={`p-4 md:p-6 transition-all duration-500
      ${darkMode ? "bg-[#020617] border-t border-slate-800" : "bg-white border-t border-slate-100 shadow-[0_-10px_40px_rgba(0,0,0,0.02)]"}`}>
      
      {amIBlocked || didIBlock ? (
        <div className="max-w-4xl mx-auto p-4 bg-red-500/10 text-red-500 text-center rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] border border-red-500/20">
          {didIBlock ? "Conversation Blocked by You" : "User has restricted communications"}
        </div>
      ) : (
        <div className="max-w-4xl mx-auto">
          {editingMsgId && (
            <div className="mb-3 px-4 py-2 bg-indigo-500/10 border-l-4 border-indigo-500 flex justify-between items-center rounded-xl animate-in slide-in-from-top-2">
              <span className="text-[10px] text-indigo-500 font-black uppercase italic">Updating Message...</span>
              <button onClick={() => { setEditingMsgId(null); setText(""); }} className="text-indigo-500 p-1 hover:bg-indigo-500 hover:text-white rounded-full transition-all">
                <FaTimes size={10} />
              </button>
            </div>
          )}

          <div className={`flex items-center gap-2 p-2 rounded-[2rem] border transition-all duration-300
            ${darkMode ? "bg-slate-900 border-slate-700 focus-within:ring-2 ring-indigo-500/30" : "bg-slate-50 border-slate-200 focus-within:ring-2 ring-indigo-500/10"}`}>
            
            <label className="p-3 text-slate-400 hover:text-indigo-500 cursor-pointer transition-colors bg-white dark:bg-slate-800 rounded-full shadow-sm">
              <input type="file" className="hidden" onChange={handleFileUpload} disabled={isUploading} />
              <FaImage size={20} />
            </label>

            <input
              value={text}
              onChange={handleInputChange}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Type your message..."
              className="flex-1 bg-transparent px-3 py-2 outline-none text-sm md:text-base dark:text-white placeholder:text-slate-400 font-medium"
              disabled={isUploading}
            />

            <button
              onClick={sendMessage}
              disabled={(!text.trim() && !isUploading) || isUploading}
              className={`p-4 rounded-full transition-all active:scale-90 flex items-center justify-center
                ${text.trim() || isUploading ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/30" : "bg-slate-200 dark:bg-slate-800 text-slate-400"}`}
            >
              {isUploading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <FaPaperPlane size={18} />}
            </button>
          </div>
        </div>
      )}
    </div>
  </div>
);

};

export default ChatWindow;