'use strict';
module.exports = (sequelize, DataTypes) => {
  const Program = sequelize.define('Program', {
    uuid:{
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      //autoIncrement: false,
      defaultValue: DataTypes.UUIDV4
    },
    name:{
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    endTime: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status:{
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  Program.associate = function(models) {
    Program.belongsTo(models.Sponsor, {
	    foreignKey: 'sponsor_uuid',
	    onDelete: 'CASCADE',
    }); 
    Program.hasMany(models.Bug, {
	    foreignKey: 'program_uuid',
	    as: 'bugs',
    }); 
  };
  sequelize.sync();
  return Program;
};