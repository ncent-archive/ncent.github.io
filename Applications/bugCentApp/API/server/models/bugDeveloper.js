'use strict';
module.exports = (sequelize, DataTypes) => {
    const bugDeveloper = sequelize.define('bugDeveloper', {
        uuid : {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        }
    });
    bugDeveloper.associate = function(models) {
        bugDeveloper.belongsTo(models.Bug, {
            foreignKey: 'bug_uuid',
            onDelete: 'CASCADE',
        }); 
        bugDeveloper.belongsTo(models.Developer, {
            foreignKey: 'developer_uuid',
            onDelete: 'CASCADE',
        }); 
      };
    sequelize.sync()
    return bugDeveloper;
}