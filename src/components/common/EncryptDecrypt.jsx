import CryptoJS from "crypto-js";

const secretKey = "a$9P&hA2vX@7ZkY1lR8o$y5Q!LmJwF#2$9jHqT&3uS";

export const encryptId = (id) => {
  if (!id) {
    console.error("ID is missing");
    return "";
  }
  return CryptoJS.AES.encrypt(id.toString(), secretKey).toString();
};

export const decryptId = (encryptedId) => {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedId, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    console.error("Decryption Error:", error);
  }
};
