const crypto = require('crypto');

// Generate a random 64-byte secret key and convert it to hexadecimal format
const secretKey = crypto.randomBytes(64).toString('hex');

console.log("Generated JWT Secret Key:", secretKey);
