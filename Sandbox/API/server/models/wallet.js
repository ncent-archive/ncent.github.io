'use strict';
module.exports = (sequelize, DataTypes) => {
  const Wallet = sequelize.define('Wallet', {
    uuid: {
	    type:DataTypes.STRING,
    	allowNull: false,
	    primaryKey: true,
      autoIncrement: false,
      unique: true,
      //type: DataTypes.UUID,
      //defaultValue: DataTypes.UUIDV4,
    },
  });
  Wallet.associate = function(models) {
    Wallet.hasMany(models.Balance, {
  	  foreignKey: 'wallet_uuid',
  	  as: 'balances', 
    });
  };
  sequelize.sync();
  return Wallet;
}