'use strict';
module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
    .then(() => {
      return queryInterface.createTable('bugUsers', {
        uuid: {
          allowNull: false,
          primaryKey: true,
          type: DataTypes.UUID
        },
        createdAt: {
          allowNull: false,
          type: DataTypes.DATE
        },
        updatedAt: {
          allowNull: false,
          type: DataTypes.DATE
        },
        bug_uuid:{
          type: DataTypes.UUID,
          foreignKey: true,
          allowNull: false,
          onDelete: 'CASCADE',
          references:{
            model: 'Bugs',
            key: 'uuid',
            as: 'bug_uuid'
          }
        },
        user_uuid: {
            type: DataTypes.UUID,
            foreignKey: true,
            allowNull: false,
            onDelete: 'CASCADE',
            references:{
              model: 'Users',
              key: 'uuid',
              as: 'user_uuid'
            }
        },
      });
    });
  },
  down: (queryInterface) => queryInterface.dropTable('bugUsers'),
  
},
{ timeStamps: true }