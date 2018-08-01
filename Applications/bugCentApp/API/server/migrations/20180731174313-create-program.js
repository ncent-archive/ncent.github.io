'use strict';
module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
    .then(() => {
      return queryInterface.createTable('Programs', {
        uuid: {
          allowNull: false,
          primaryKey: true,
          type: DataTypes.UUID
        },
        name:{
          type: DataTypes.STRING,
          allowNull: false,
          unique: true
        },
        endTime: {
          type: DataTypes.STRING,
          allowNull: true
        },
        status:{
          type: DataTypes.STRING,
          allowNull: true
        },
        
        createdAt: {
          allowNull: false,
          type: DataTypes.DATE
        },
        updatedAt: {
          allowNull: false,
          type: DataTypes.DATE
        },
        sponsor_uuid:{
          type: DataTypes.UUID,
          foreignKey: true,
          allowNull: false,
          onDelete: 'CASCADE',
          references:{
            model: 'Sponsor',
            key: 'uuid',
            as: 'sponsor_uuid'
          }
        }
      });
    });
  },
  down: (queryInterface) => queryInterface.dropTable('Programs'),
  
};