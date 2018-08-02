'use strict';
module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
    .then(() => {
        return queryInterface.createTable('Developers', {
            uuid: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER
            },
            name: {
                type: DataTypes.STRING,
                unique: false
            },
            email: {
                type: DataTypes.STRING,
                unique: true
            },
            bugs_uuid:{
                type: DataTypes.UUID,
                foreignKey: true,
                allowNull: true,
                onDelete: 'CASCADE',
                references:{
                  model: bugDeveloper,
                  key: 'uuid',
                  as: 'bugs_uuid'
                }
            },
            createdAt: {
                allowNull: false,
                type: DataTypes.DATE
            },
            updatedAt: {
                allowNull: false,
                type: DataTypes.DATE
            }

        });
    });
  },
  down: (queryInterface) => queryInterface.dropTable('Developers'),
  
},
{ timeStamps: true }