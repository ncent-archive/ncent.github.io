'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
    .then(() => {
        return queryInterface.createTable('Developers', {
            uuid: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.STRING,
                unique: false
            },
            email: {
                type: Sequelize.STRING,
                unique: true
            },
            bug_uuid:{
                type: DataTypes.UUID,
                foreignKey: true,
                allowNull: true,
                onDelete: 'CASCADE',
                references:{
                  model: 'bugDevelopers',
                  key: 'uuid',
                  as: 'bug_uuid'
                }
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }

        });
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Developers');
  }
};