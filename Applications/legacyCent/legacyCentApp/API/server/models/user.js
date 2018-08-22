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
      type: DataTypes.DECIMAL,
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
    },
    referredBy_uuid:{
      type: DataTypes.UUID,
      allowNull: true,
    }
  });
  // User.associate = function(models) {
  //   User.hasMany(models.referredBy, {
  //     foreignKey: 'user_uuid',
  //     as: 'referral',
  //   }); 
  // };
  sequelize.sync();
  return User;
};