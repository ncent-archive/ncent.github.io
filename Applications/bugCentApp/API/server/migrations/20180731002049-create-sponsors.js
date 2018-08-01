'use strict';
module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
    .then(() => {
        return queryInterface.createTable('Sponsor', {
          uuid: {
            allowNull: false,
            //autoIncrement: true,
            primaryKey: true,
            type: DataTypes.UUID
          },
          name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
          },
          email: {
            type: DataTypes.STRING,
            allowNull: true
          },
          phone:{
            type: DataTypes.STRING,
            allowNull: true
          },
          website:{
            type: DataTypes.STRING,
            allowNull:true
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
      down: (queryInterface) =>  queryInterface.dropTable('Sponsor'),
      
};