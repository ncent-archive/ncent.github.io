'use strict';
module.exports = (sequelize, DataTypes) => {
  const TokenType = sequelize.define('TokenType', {
    Name: {
	    type: DataTypes.STRING, 
	    allowNull: false
    },
    uuid: {
	    type: DataTypes.UUID,
	    primaryKey: true,
	    allowNull: false,
      autoIncrement: false,
      defaultValue: DataTypes.UUIDV4,
    },
    ExpiryDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    sponsor_uuid: {
      //type: DataTypes.UUID,
      type: DataTypes.STRING,
      allowNull: false,
    },
    totalTokens: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    // ValueEscrowRate: {
    //   type: DataTypes.FLOAT,
    //   allowNull: false,
    //   defaultValue: 1
    // },
    // CashoutRate: {
	  //   type: DataTypes.FLOAT,
	  //   allowNull: false,
	  //   defaultValue: 1
    // },
    // ProvenanceLength: {
	  //   type: DataTypes.INTEGER, 
	  //   defaultValue: 1
    // },
    // Lambda: DataTypes.FLOAT, 
  });
 
  TokenType.associate = (models) => {
    TokenType.hasMany(models.Transaction, {
	    foreignKey: 'tokentype_uuid',
	    as: 'transactions', 
    });
  };
  sequelize.sync();
  return TokenType;
};
