const bcrypt = require('bcrypt');

export const generatePasswordDigest = (password) => {
  const salt = bcrypt.genSaltSync();
  const passwordDigest = bcrypt.hashSync(password, salt);
  return passwordDigest;
};
