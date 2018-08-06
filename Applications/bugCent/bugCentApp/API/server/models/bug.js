'use strict';
module.exports = (sequelize, DataTypes) => {
  const Bug = sequelize.define('Bug', {
    uuid:{
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4
    },
    name:{
      type: DataTypes.STRING,
      allowNull: false,
      unique: false
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'Incomplete',
      allowNull: false
    },
    bountyAmount:{
      type: DataTypes.INTEGER,
      allowNull: true
    }
  });
  Bug.associate = function(models) {
    Bug.hasMany(models.bugUser, {
      foreignKey: 'bug_uuid',
      as: 'users',
  }); 
    
  };
  sequelize.sync();
  return Bug;
};