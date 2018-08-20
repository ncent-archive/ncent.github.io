'use strict';

const Sequelize = require('sequelize');
const db = require('../index.js');

const User = db.define('users', {
  email: {
  	type: Sequelize.STRING,
  	allowNull: false
  },
  password: {
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

module.exports = User;
