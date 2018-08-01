'use strict';
module.exports = (sequelize, DataTypes) => {
  const Program = sequelize.define('Program', {
    name:{
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    uuid:{
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      //autoIncrement: false,
      defaultValue: DataTypes.UUIDV4
    },
    endTime: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status:{
      type: DataTypes.STRING,
      allowNull: false
    }
    // sponsor_uuid:{
    //   type: DataTypes.UUID,
    //   foreignKey: true,
    //   allowNull: false,
    //   onDelete: 'CASCADE',
    //   references:{
    //       model: 'Sponsor',
    //       key: 'uuid',
    //       as: 'sponsor_uuid'
    //     }
    // }
    
  });
  Program.associate = function(models) {
    Program.belongsTo(models.Sponsor, {
	    foreignKey: 'sponsor_uuid',
	    onDelete: 'CASCADE',
    }); 
    // Program.hasMany(models.Bug, {
	  //   foreignKey: 'program_uuid',
	  //   as: 'bugs',
    // }); 
  };
  sequelize.sync();
  return Program;
};