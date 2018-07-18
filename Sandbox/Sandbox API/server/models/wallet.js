'use strict';
module.exports = (sequelize, DataTypes) => {
  const Wallet = sequelize.define('Wallet', {
    uuid: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      autoIncrement: false,
      defaultValue: DataTypes.UUIDV4,
    },
    wallet_uuid: {
	    type:DataTypes.STRING,
      allowNull: false
      //type: DataTypes.UUID,
      //defaultValue: DataTypes.UUIDV4,
    },
    tokentype_uuid: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: '5963c694-59f2-4cd5-9fc0-d28175094fd4',
    },
    balance: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      //validate: {min: 0, max: }
    }
  },{
    indexes: [
      { fields: ['wallet_uuid', 'tokentype_uuid'], unique: true }
    ]
  });
  return Wallet;
}