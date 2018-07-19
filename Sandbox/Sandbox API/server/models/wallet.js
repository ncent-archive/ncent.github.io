'use strict';
module.exports = (sequelize, DataTypes) => {
  const Wallet = sequelize.define('Wallet', {
    uuid: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      autoIncrement: false,
      defaultValue: DataTypes.UUIDV4
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
      defaultValue: '498cc1fe-62d3-4863-a0e0-a42049b90fff'
      // validate: {
      //   exists: function(value) {
      //     console.log(value);
      //     return sequelize.models.TokenType.findById(value)
      //     .then(tokentype => {
      //       if (!tokentype) {
      //         throw new Error({error: [{message: 'TokenType Not Found'}]});
      //       } else {
      //         return;
      //       }
      //     })
      //     .catch(error => console.log(error.message))
      //   }
      // }
    },
    balance: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
      //validate: {min: 0, max: }
    }
  },{
    indexes: [
      { fields: ['wallet_uuid', 'tokentype_uuid'], unique: true }
    ]
  });
  return Wallet;
}