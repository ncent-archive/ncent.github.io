'use strict';
module.exports = (sequelize, DataTypes) => {
    const bugUser = sequelize.define('bugUser', {
        uuid : {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: DataTypes.UUIDV4
        }
    });
    bugUser.associate = function(models) {
        bugUser.belongsTo(models.Bug, {
            foreignKey: 'bug_uuid',
            onDelete: 'CASCADE',
        }); 
        bugUser.belongsTo(models.User, {
            foreignKey: 'user_uuid',
            onDelete: 'CASCADE',
        }); 
      };
    sequelize.sync()
    return bugUser;
}