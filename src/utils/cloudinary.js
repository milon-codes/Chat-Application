/**
 * Cloudinary-তে ছবি আপলোড করার ফাংশন
 * @param {File} file - ইউজারের সিলেক্ট করা ছবি
 * @returns {String} - আপলোড করা ছবির URL
 */
export const uploadToCloudinary = async (file) => {
  if (!file) return null;

  const cloudName = "da65g97jk"; 
  const uploadPreset = "chatly_preset";

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);
  formData.append("folder", "Chatly"); 

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await response.json();
    return data.secure_url; // এটিই Firestore-এ সেভ হবে
  } catch (error) {
    console.error("Cloudinary Error:", error);
    return null;
  }
};