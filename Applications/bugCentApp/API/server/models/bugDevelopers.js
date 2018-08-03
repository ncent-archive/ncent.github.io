'use strict';
module.exports = (sequelize, DataTypes) => {
    const bugDevelopers = sequelize.define('bugDevelopers', {
        uuid : {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        }
    });
    bugDevelopers.associate = function(models) {
        bugDevelopers.belongsTo(models.Bug, {
            foreignKey: 'bug_uuid',
            onDelete: 'CASCADE',
        }); 
        bugDevelopers.belongsTo(models.Developer, {
            foreignKey: 'developer_uuid',
            onDelete: 'CASCADE',
        }); 
      };
    sequelize.sync()
    return bugDevelopers;
}