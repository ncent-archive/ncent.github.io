'use strict';
module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define('Transaction', {
    uuid:{
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      autoIncrement: false,
      defaultValue: DataTypes.UUIDV4,
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    fromAddress:{
      //type: DataTypes.UUID,
      type: DataTypes.STRING,
      allowNull: false
    },
    toAddress:{
      //type: DataTypes.UUID,
      type: DataTypes.STRING,
      allowNull:false
    },
  });
  Transaction.associate = function(models) {
    Transaction.belongsTo(models.TokenType, {
	    foreignKey: 'tokentype_uuid',
	    onDelete: 'CASCADE',
    }); 
  };
  sequelize.sync();
  return Transaction;
};
