'use strict';
module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
    .then(() => {
      queryInterface.createTable('Balances', {
        uuid: {
	        type: DataTypes.UUID,
	        primaryKey: true,
	        allowNull: false,
          autoIncrement: false,
        },
        tokentype_uuid: {
          allowNull: false,
          type: DataTypes.UUID,
        },
        amount: {
          type: DataTypes.FLOAT,
          allowNull: false,
        },
        createdAt: {
          allowNull: false,
          type: DataTypes.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: DataTypes.DATE,
        },
        wallet_uuid: {
          type: DataTypes.STRING,
          onDelete: 'CASCADE',
          references: {
            model: 'Wallets',
            key: 'uuid',
            as: 'wallet_uuid',
          },
        },	
      });
    });
  },
  down: (queryInterface) => queryInterface.dropTable('Balances'),
};
