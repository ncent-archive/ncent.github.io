'use strict';

const Sequelize = require('sequelize');
const db = require('../index.js');

const University = db.define('university', {
  name: {
  	type: Sequelize.STRING,
  	allowNull: false
  },
  token_id: {
  	type: Sequelize.INTEGER,
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

module.exports = University;
