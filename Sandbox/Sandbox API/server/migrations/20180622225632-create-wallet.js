'use strict';
module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
    .then(() => {
      queryInterface.createTable('Wallets', {
        uuid: {
          //type: DataTypes.UUID,
          type: DataTypes.STRING,
          allowNull: false,
          primaryKey: true,
	        autoIncrement: false
        },
        createdAt: {
          allowNull: false,
          type: DataTypes.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: DataTypes.DATE,
        },
      });
    });
  },
  down: (queryInterface) => queryInterface.dropTable('Wallets'),
};
