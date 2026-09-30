import { ref, update, get } from "firebase/database";
import { rtdb } from "../firebase/firebase";

export const ConnectUser = async (currentUser, foundUser, myFirestoreData) => {
  // currentUser: Auth user
  // foundUser: যাকে সার্চ করে পাওয়া গেছে (Target User)
  // myFirestoreData: Firestore থেকে আসা আপনার নিজের তথ্য
  
  if (!currentUser || !foundUser) return;

  const currentUid = currentUser.uid;
  const otherUid = foundUser.uid;

  try {
    // ১. অলরেডি ফ্রেন্ড কি না তা চেক করা
    const friendCheck = await get(ref(rtdb, `userChats/${currentUid}/${otherUid}`));
    if (friendCheck.exists()) {
      alert("You are already friends!");
      return;
    }

    // ২. রিকোয়েস্ট ডাটা অবজেক্ট তৈরি (Firestore ডাটা থেকে নাম ও ছবি নেওয়া হচ্ছে)
    // টার্গেট ইউজারের জন্য আপনার তথ্য (received)
    const requestDataForTarget = {
      uid: currentUid,
      fullName: myFirestoreData?.fullName || currentUser.displayName || "User",
      profilePhoto: myFirestoreData?.profilePhoto || currentUser.photoURL || "https://via.placeholder.com/150",
      timestamp: Date.now()
    };

    // আপনার জন্য টার্গেট ইউজারের তথ্য (sent)
    const requestDataForMe = {
      uid: otherUid,
      fullName: foundUser.fullName || "User",
      profilePhoto: foundUser.profilePhoto || "https://via.placeholder.com/150",
      timestamp: Date.now()
    };

    // ৩. একসাথে ডাটাবেজে পুশ করা
    const updates = {};
    updates[`requests/received/${otherUid}/${currentUid}`] = requestDataForTarget;
    updates[`requests/sent/${currentUid}/${otherUid}`] = requestDataForMe;

    await update(ref(rtdb), updates);
    alert("Friend Request Sent Successfully!");

  } catch (error) {
    console.error("Connection Error:", error);
    alert("Request sending failed!");
  }
};