'use strict';
module.exports = (sequelize, DataTypes) => {
  const Balance = sequelize.define('Balance', {
    uuid: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      autoIncrement: false,
      defaultValue: DataTypes.UUIDV4,
    },
    tokentype_uuid: {
      allowNull: false,
      type: DataTypes.UUID,
    },
    amount: {
	    type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
  });
  Balance.associate = function(models) {
    Balance.belongsTo(models.Wallet, {
	    foreignKey: 'wallet_uuid',
	    onDelete: 'CASCADE',
    }); 
  };
  sequelize.sync();
  return Balance;
};
