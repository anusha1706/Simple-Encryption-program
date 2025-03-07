const express = require("express");
const cors = require("cors");
const CryptoJS = require("crypto-js");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;
const SECRET_KEY = process.env.SECRET_KEY || "mysecretkey123";

app.use(cors());
app.use(express.json());

let messages = [];

// Encrypt and store a message
app.post("/encrypt", (req, res) => {
  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }
  const ciphertext = CryptoJS.AES.encrypt(message, SECRET_KEY).toString();
  messages.push(ciphertext);
  res.json({ encryptedMessage: ciphertext });
});

// Decrypt a message
app.post("/decrypt", (req, res) => {
  const { encryptedMessage } = req.body;
  if (!encryptedMessage) {
    return res.status(400).json({ error: "Encrypted message is required" });
  }
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedMessage, SECRET_KEY);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    res.json({ decryptedMessage: originalText });
  } catch (error) {
    res.status(500).json({ error: "Decryption failed" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
