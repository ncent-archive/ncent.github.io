'use strict';
module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
    .then(() => {
      return queryInterface.createTable('Users', {
        uuid: {
          allowNull: false,
          primaryKey: true,
          type: DataTypes.UUID
        },
        name:{
          type: DataTypes.STRING,
          allowNull: true,
          unique: true
        },
        username: {
          type: DataTypes.STRING,
          unique: true,
          allowNull:false
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false
        },
        public_key:{
          type: DataTypes.STRING,
          allowNull: true,
          unique: true
        },
        balance:{
          type: DataTypes.INTEGER,
          allowNull: true,
          unique: false
        },
        private_key:{
          type: DataTypes.STRING,
          allowNull: true,
          unique: true
        },
        isCompany: {
          type: DataTypes.BOOLEAN,
          allowNull: false
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        createdAt: {
          allowNull: false,
          type: DataTypes.DATE
        },
        updatedAt: {
          allowNull: false,
          type: DataTypes.DATE
        },
      });
    });
  },
  down: (queryInterface) => queryInterface.dropTable('Users'),
  
},
{ timeStamps: true }