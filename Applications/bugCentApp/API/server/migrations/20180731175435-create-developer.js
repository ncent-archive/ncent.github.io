'use strict';
module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
    .then(() => {
        return queryInterface.createTable('Developers', {
            uuid: {
                allowNull: false,
                primaryKey: true,
                type: DataTypes.UUID
            },
            name: {
                type: DataTypes.STRING,
                unique: false
            },
            email: {
                type: DataTypes.STRING,
                unique: true
            },
            // bug_uuid:{
            //     type: DataTypes.UUID,
            //     foreignKey: true,
            //     allowNull: true,
            //     onDelete: 'CASCADE',
            //     references:{
            //       model: 'bugDevelopers',
            //       key: 'uuid',
            //       as: 'bugs_uuid'
            //     }
            // },
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