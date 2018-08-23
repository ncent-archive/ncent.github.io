'use strict';

const Sequelize = require('sequelize');
const db = require('../index.js');

const {
  createKeypair,
  stampUniversityToken
} = require('../../server/utils/sdk_utils');

const University = db.define('universities', {
  name: {
  	type: Sequelize.STRING,
  	allowNull: false
  },
  token_id: {
  	type: Sequelize.UUID,
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

University.addHook('beforeValidate', (university) => {
  const { publicKey, privateKey } = createKeypair();
  university.public_key = publicKey;
  university.private_key = privateKey;
  return (stampUniversityToken(university));
});

module.exports = University;
