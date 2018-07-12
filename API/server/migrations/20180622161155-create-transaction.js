'use strict';
module.exports = {
  up: (queryInterface, DataTypes) => {
	return queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
	.then(() => {
    	return queryInterface.createTable('Transactions', {
    		uuid:{
      			type: DataTypes.UUID,
     	  		primaryKey: true,
     	  		allowNull: false,
     	  		autoIncrement: false,
   			},
   			amount: {
      			type: DataTypes.INTEGER,
      			allowNull: false,
    		},
   			fromAddress:{
				//type: DataTypes.UUID,
				type: DataTypes.STRING,  
      			allowNull: false,
    		},
    		toAddress:{
				//type: DataTypes.UUID,
				type: DataTypes.STRING,
        		allowNull:false,
    		},
    		createdAt: {
      			allowNull: false,
      			type: DataTypes.DATE,
    		},
    		updatedAt: {
      			allowNull: false,
      			type: DataTypes.DATE,
    		},
			tokentype_uuid: {
	 		 	type: DataTypes.UUID,
	  			allowNull: false,
	  			foreignKey: true,
	  			onDelete: 'CASCADE',
	  			references: {
	    			model: 'TokenTypes',
	   				key: 'uuid',
	    			as: 'tokentype_uuid',	
	  			},	
			},
		});
	});
  },
  down: (queryInterface) => queryInterface.dropTable('Transactions'),
};
