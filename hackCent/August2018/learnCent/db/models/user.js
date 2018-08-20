'use strict';

const Sequelize = require('sequelize');
const db = require('../index.js');

const User = db.define('users', {
  email: {
  	type: Sequelize.STRING,
  	allowNull: false
  },
  password_digest: {
  	type: Sequelize.STRING,
  	allowNull: false
  },
  session_token: {
    type: Sequelize.INTEGER,
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

module.exports = User;
