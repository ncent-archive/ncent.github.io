'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      autoIncrement: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    wallet: {
      type: DataTypes.STRING,
      allowNull: true, 
      unique: true,
    }
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};