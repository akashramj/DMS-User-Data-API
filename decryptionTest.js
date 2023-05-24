const crypto = require("crypto");

function decryptValue(encryptedValue, iv, secretKey) {
  const decipher = crypto.createDecipheriv(
    "aes-256-ctr",
    secretKey,
    Buffer.from(iv, "hex")
  );

  let decrypted = decipher.update(encryptedValue, "hex", "utf8");
  decrypted += decipher.final("utf8");

  return decrypted;
}

const encryptedValue = "8cf4b1c43d0450e1b13cc9";
const iv = "c5278d1af81ef48e923de7bc20a52131";
const secretKey = "H+MbQeUhViYq4t6w9z$C&F)J@NERfVaW";

const decryptedValue = decryptValue(encryptedValue, iv, secretKey);
console.log(decryptedValue);
