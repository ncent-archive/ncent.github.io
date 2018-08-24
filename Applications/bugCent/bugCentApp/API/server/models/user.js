'use strict';
var bcrypt = require("bcrypt");
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    uuid:{
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4
    },
    name:{
      type: DataTypes.STRING,
      allowNull: true,
      unique: true
    },
    balance:{
      type: DataTypes.INTEGER,
      allowNull: true,
      unique: false
    },
    public_key:{
      type: DataTypes.STRING,
      allowNull: true,
      unique: true
    },
    private_key:{
      type: DataTypes.STRING,
      allowNull: true,
      unique: true
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate:{
        len: [1,100]
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        len: [1,100]
      }
    },
    isCompany: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate:{
        len: [4,100]
      }
    }
  }, {
    hooks: {
      beforeCreate: (user) => {
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(user.password, salt);
      }
    },
     
  });
  User.associate = function(models) {
    User.hasMany(models.bugUser, {
	    foreignKey: 'user_uuid',
	    as: 'bugs',
    }); 
  };
  sequelize.sync();
  return User;
};