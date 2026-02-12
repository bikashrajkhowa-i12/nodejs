const crypto = require("crypto");

// hashing
const hash = crypto.createHash("sha256").update("hello").digest("hex");
console.log("hashing: ", hash);

// 🔓 encryption
const algorithm = "aes-256-cbc";
const key = crypto.randomBytes(32); // 256 bits
const iv = crypto.randomBytes(16); // 16 bytes for AES

const cipher = crypto.createCipheriv(algorithm, key, iv);

let encrypted = cipher.update("my secret password", "utf8", "hex");
encrypted += cipher.final("hex");

console.log("Encrypted:", encrypted);

// 🔓 Decryption
const decipher = crypto.createDecipheriv(algorithm, key, iv);
let decrypted = decipher.update(encrypted, "hex", "utf8");
decrypted += decipher.final("utf8");

console.log("Decrypted:", decrypted);

// random data
let random = crypto.randomBytes(16).toString("hex");
console.log("Random data: ", random);

// pbkdf2
crypto.pbkdf2(
  "myPassword",
  "randomSalt",
  100000,
  32,
  "sha256",
  (err, derivedKey) => {
    if (err) throw err;
    console.log("pbkdf2: ", derivedKey.toString("hex"));
  },
);
