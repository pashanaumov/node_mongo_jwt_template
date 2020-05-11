const crypto = require("crypto");

module.exports = {
  jwtSecretString: crypto.createHash("sha256").digest("hex")
};
