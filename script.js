const SECRET_KEY = "mysecretkey123";

function encryptMessage() {
    let message = document.getElementById("message").value;
    if (!message) {
        alert("Please enter a message to encrypt.");
        return;
    }
    
    let ciphertext = CryptoJS.AES.encrypt(message, SECRET_KEY).toString();
    document.getElementById("encryptedMessage").value = ciphertext;
}

function decryptMessage() {
    let encryptedMessage = document.getElementById("encryptedMessage").value;
    if (!encryptedMessage) {
        alert("Please enter an encrypted message.");
        return;
    }
    
    let bytes = CryptoJS.AES.decrypt(encryptedMessage, SECRET_KEY);
    let originalText = bytes.toString(CryptoJS.enc.Utf8);
    document.getElementById("decryptedMessage").value = originalText;
}
