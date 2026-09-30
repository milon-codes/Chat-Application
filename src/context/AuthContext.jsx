import { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  onAuthStateChanged,
  signOut,
  signInWithPopup,
} from "firebase/auth";
import { auth, db, rtdb, googleProvider } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import {
  ref,
  set,
  onDisconnect,
  serverTimestamp as rtdbTimestamp,
} from "firebase/database";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(true);
  console.log("user authcontext", user);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        // ১. আপনার আগের কোড: Firestore থেকে user data load
        const userDocRef = doc(db, "users", authUser.uid);
        const userSnap = await getDoc(userDocRef);

        if (userSnap.exists()) {
          setUser({
            uid: authUser.uid,
            emailVerified: authUser.emailVerified,
            ...userSnap.data(),
          });

          // ২. নতুন লজিক: Realtime Database-এ অনলাইন স্ট্যাটাস ম্যানেজমেন্ট
          const userStatusRef = ref(rtdb, `status/${authUser.uid}`);

          // ইউজার অ্যাপে থাকা অবস্থায় অনলাইন সেট করা
          set(userStatusRef, {
            state: "online",
            last_changed: rtdbTimestamp(),
          });

          // ইউজার ট্যাব বন্ধ করলে বা কানেকশন হারালে অটো অফলাইন
          onDisconnect(userStatusRef).set({
            state: "offline",
            last_changed: rtdbTimestamp(),
          });
        } else {
          setUser(null);
        }
      } else {
        // ইউজার লগআউট করলে বা না থাকলে
        setUser(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Create user with email and password
  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Send User veryfy email
  const sendEmail = (createdUser) => {
    return sendEmailVerification(createdUser);
  };

  // Login user
  const loginUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Logout User
  const logoutUser = () => {
    return signOut(auth);
  };

  // google Login

  const GoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log(result, "result");

      return result;
    } catch (error) {
      // কোনো এরর হলে এখানে দেখাবে
      console.error("লগইন করতে সমস্যা হয়েছে:", error.message);
      throw error;
    }
  };

  const authInfo = {
    user,
    setUser,
    successMsg,
    setSuccessMsg,
    errorMsg,
    setErrorMsg,
    loading,
    createUser,
    sendEmail,
    loginUser,
    logoutUser,
    GoogleLogin,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
