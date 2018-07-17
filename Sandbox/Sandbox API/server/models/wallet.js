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
      allowNull: false
    },
    balance: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    }
  },{
    indexes: [
      { fields: ['wallet_uuid', 'tokentype_uuid'], unique: true }
    ]
  });
  return Wallet;
}