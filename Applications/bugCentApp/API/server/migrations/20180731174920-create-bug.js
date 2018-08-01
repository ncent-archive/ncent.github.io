'use strict';
module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
    .then(() => {
        return queryInterface.createTable('Bug', {
            uuid: {
                allowNull: false,
                primaryKey: true,
                type: DataTypes.UUID
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            status: {
                type: DataTypes.STRING,
                allowNull: false
            },
            bountyAmount:{
                type: DataTypes.INTEGER,
                allowNull: false
            },
            program_uuid:{
                type: DataTypes.UUID,
                foreignKey: true,
                allowNull: false,
                onDelete: 'CASCADE',
                references:{
                  model: 'Program',
                  key: 'uuid',
                  as: 'program_uuid'
                }
            },
            dev_uuid:{
                type: DataTypes.UUID,
                foreignKey: true,
                allowNull: true,
                onDelete: 'CASCADE',
                references:{
                  model: 'bugDevelopers',
                  key: 'uuid',
                  as: 'developer_uuid'
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
  down: (queryInterface) => queryInterface.dropTable('Bug'),
  
};