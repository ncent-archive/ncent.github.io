'use strict';
module.exports = (sequelize, DataTypes) => {
  const Bug = sequelize.define('Bug', {
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
      onDelete: 'CASCADE',
    }); 
    // Bug.belongsToMany(models.Developer, {
    //   through: {
    //     model:'bugDevelopers',
    //     unique: false
    //   },
    //  // as: 'workingbugs',
	  //   foreignKey: 'dev_uuid',
    //   onDelete: 'CASCADE',
    // }); 
    // Bug.hasMany(models.Developer, {
    //   foreignKey: 'Developer_uuid',
    //   as: 'developers'
    // })
  };
  sequelize.sync();
  return Bug;
};