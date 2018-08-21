'use strict';

const Sequelize = require('sequelize');
const db = require('../index.js');
const bcrypt = require('bcrypt');

const { createUserKeypair } = require('../../server/utils/sdk_utils');
const { generatePasswordDigest } = require('../../server/utils/user_utils');

const User = db.define('users', {
  email: {
  	type: Sequelize.STRING,
  	allowNull: false
  },
  password_digest: {
  	type: Sequelize.STRING,
  	allowNull: false
  },
  public_key: {
  	type: Sequelize.STRING,
  	allowNull: false
  },
  private_key: {
  	type: Sequelize.STRING,
  	allowNull: false
  },
});

User.addHook('beforeValidate', (user) => {
  const { publicKey, privateKey } = createUserKeypair();
  user.public_key = publicKey;
  user.private_key = privateKey;
  user.password_digest = generatePasswordDigest(user.password_digest);
});

User.prototype.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password_digest);
};

module.exports = User;
