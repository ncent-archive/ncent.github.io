'use strict';
module.exports = (sequelize, DataTypes) => {
  const Developer = sequelize.define('Developer', {
    uuid:{
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      autoIncrement: false,
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
    Developer.belongsToMany(models.Bug, {
      through: 'bugDevelopers',
      as: 'devsOnTask',
      foreignKey: 'bugs_uuid',
      otherKey: 'developer_uuid',
	    onDelete: 'CASCADE',
    }); 
  };
  sequelize.sync();
  return Developer;
};