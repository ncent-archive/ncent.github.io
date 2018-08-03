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
      allowNull: false
    },
    
  });
  Bug.associate = function(models) {
    Bug.belongsTo(models.Program, {
	    foreignKey: 'program_uuid',
      onDelete: 'CASCADE'
    }); 
    Bug.hasMany(models.bugDevelopers, {
      as: 'devsWorkingOn',
      foreignKey: 'bug_uuid',
    }); 
    
  };
  sequelize.sync();
  return Bug;
};