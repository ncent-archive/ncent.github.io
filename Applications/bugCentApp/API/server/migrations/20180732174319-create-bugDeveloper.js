'use strict';
module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
    .then(() => {
      return queryInterface.createTable('bugDevelopers', {
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
            model: 'Bug',
            key: 'uuid',
            as: 'bug_uuid'
          }
        },
        developer_uuid: {
            type: DataTypes.UUID,
            foreignKey: true,
            allowNull: false,
            onDelete: 'CASCADE',
            references:{
              model: 'Developer',
              key: 'uuid',
              as: 'developer_uuid'
            }
        },
      });
    });
  },
  down: (queryInterface) => queryInterface.dropTable('bugDevelopers'),
  
},
{ timeStamps: true }