'use strict';
module.exports = (sequelize, DataTypes) => {
  const Developer = sequelize.define('Developer', {
    name:{
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    uuid:{
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      autoIncrement: false,
      defaultValue: DataTypes.UUIDV4
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true
    },
    
  });
  Developer.associate = function(models) {
    Developer.belongsToMany(models.Bug, {
      through: {
        model: 'bugDevelopers',
        unique: false,
      },
      //as: 'developers',
	    foreignKey: 'bug_uuid',
	    onDelete: 'CASCADE',
    }); 
    Developer.hasMany(models.Bug, {
	    foreignKey: 'developer_uuid',
	    as: 'bugs',
    }); 
  };
  sequelize.sync();
  return Developer;
};