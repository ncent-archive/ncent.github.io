'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      autoIncrement: false,
    },
    public_key: {
	    type:DataTypes.STRING,
      allowNull: false
    },
    private_key: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  });
  return User;
}