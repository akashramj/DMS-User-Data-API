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

const encryptedValue = "00467";
const iv = "b3874534bfec1150008155ac5aedfe84";
const secretKey = "H+MbQeUhViYq4t6w9z$C&F)J@NERfVaW";

const decryptedValue = decryptValue(encryptedValue, iv, secretKey);
console.log(decryptedValue);
