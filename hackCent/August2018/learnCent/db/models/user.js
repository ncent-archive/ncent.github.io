'use strict';

const Sequelize = require('sequelize');
const db = require('../index.js');
const bcrypt = require('bcrypt');

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
  	type: Sequelize.INTEGER,
  	allowNull: false
  },
  private_key: {
  	type: Sequelize.INTEGER,
  	allowNull: false
  },
});

User.addHook('beforeValidate', (user) => {
  // TODO generate wallet for public_key and private_key
  user.public_key = 1;
  user.private_key = 1;
});

User.prototype.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = User;
