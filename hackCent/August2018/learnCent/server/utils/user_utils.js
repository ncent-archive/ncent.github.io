const bcrypt = require('bcrypt');

const generatePasswordDigest = (password) => {
  const salt = bcrypt.genSaltSync();
  const passwordDigest = bcrypt.hashSync(password, salt);
  return passwordDigest;
};

module.exports = { generatePasswordDigest };
