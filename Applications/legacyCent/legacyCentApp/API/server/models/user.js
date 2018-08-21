'use strict';
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
    points:{
      type: DataTypes.INTEGER,
      allowNull: true,
      unique: false
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate:{
        len: [1,100]
      }
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate:{
        len: [4,100]
      }
    }
  });
  // User.associate = function(models) {
  //   User.hasMany(models.referredBy, {
  //     foreignKey: 'referredBy_uuid',
    
  //   }); 
  // };
  sequelize.sync();
  return User;
};