'use strict';

const Sequelize = require('sequelize');
const db = require('../index.js');

const Request = db.define('users', {
  sender_id: {
  	type: Sequelize.INTEGER,
  	allowNull: false
  },
  receiver_id: {
  	type: Sequelize.INTEGER,
  	allowNull: false
  },
});

module.exports = Request;
