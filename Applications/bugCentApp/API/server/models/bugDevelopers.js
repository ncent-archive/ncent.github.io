'use strict';
module.exports = (sequelize, DataTypes) => {
    const bugDevelopers = sequelize.define('bugDevelopers', {
        id : {
        type: DataTypes.UUID,
        primaryKey: true,
        autoIncrement: false
        },
        bug_id: {
        type: DataTypes.INTEGER,
        unique: 'item_tag_taggable'
        },
        taggable: {
        type: DataTypes.STRING,
        unique: 'item_tag_taggable'
        },
        dev_id: {
        type: DataTypes.INTEGER,
        unique: 'item_tag_taggable',
        references: null
        }
    });
    sequelize.sync()
    return bugDevelopers;
}