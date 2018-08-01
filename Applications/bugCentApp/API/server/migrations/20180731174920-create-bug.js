'use strict';
module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
    .then(() => {
        return queryInterface.createTable('Bug', {
            uuid: {
                allowNull: false,
                autoIncrement: true,
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
  down: (queryInterface, DataTypes) => {
    return queryInterface.dropTable('Bug');
  }
};