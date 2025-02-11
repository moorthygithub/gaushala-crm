import CryptoJS from "crypto-js";

const secretKey = import.meta.env.VITE_SECRET_KEY;

if (!secretKey) {
  console.error("Secret key is not defined in .env");
}

export const encryptId = (id) => {
  if (!id) {
    console.error("ID is missing");
    return "";
  }
  return CryptoJS.AES.encrypt(id.toString(), secretKey).toString(); // Encrypt the ID and return it
};

// Function to decrypt an encrypted ID
export const decryptId = (encryptedId) => {
  try {
    if (!encryptedId) {
      console.error("Encrypted ID is missing");
      return ""; // Return an empty string if encrypted ID is missing
    }
    const bytes = CryptoJS.AES.decrypt(encryptedId, secretKey); // Decrypt the ID
    return bytes.toString(CryptoJS.enc.Utf8); // Return the decrypted ID
  } catch (error) {
    console.error("Decryption Error:", error);
    return ""; // Return an empty string if decryption fails
  }
};
