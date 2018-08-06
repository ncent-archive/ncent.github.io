'use strict';
module.exports = (sequelize, DataTypes) => {
  const Developer = sequelize.define('Developer', {
    uuid:{
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4
    },
    name:{
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true
    },
    
  });
  Developer.associate = function(models) {
    Developer.hasMany(models.bugDeveloper, {
      as: 'bugsInProgress',
      foreignKey: 'developer_uuid',
	   
    }); 
  };
  sequelize.sync();
  return Developer;
};