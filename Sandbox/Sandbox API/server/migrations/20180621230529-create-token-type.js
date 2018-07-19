'use strict';
module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
    .then(() => {
      return queryInterface.createTable('TokenTypes', {
        Name: {
	        type: DataTypes.STRING, 
          allowNull: false,
          unique: true
        },
        uuid: {
	        type: DataTypes.UUID,
	        primaryKey: true,
	        allowNull: false,
          autoIncrement: false,
        },
        ExpiryDate: {
          type: DataTypes.DATE,
          allowNull: false
        },
        sponsor_uuid: {
          //type: DataTypes.UUID,
          type: DataTypes.STRING,
          allowNull: false,
        },
        totalTokens: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
          // ValueEscrowRate: {
          //   type: DataTypes.FLOAT,
          //   allowNull: false
          // },
          // CashoutRate: {
          //   type: DataTypes.FLOAT,
          //   allowNull: false,
          // },
          // ProvenanceLength: {
          //   type: DataTypes.INTEGER,
          // },
          // Lambda: DataTypes.FLOAT,
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
  down: (queryInterface) => queryInterface.dropTable('TokenTypes'),
};
