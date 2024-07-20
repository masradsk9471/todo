const crypto = require('crypto');
const createHash = (algorithm) => crypto.createHash('sha256');

module.exports = {
  // ... other configuration options
  output: {
    hashFunction: createHash,
  },
};
