import {SEND_INFO_UPDATE, SEND_TOKENS, SEND_TOKENS_SUCCESS, SEND_TOKENS_FAIL, CLEAR_TRANSACTION_INPUTS} from './types';
import {Actions} from 'react-native-router-flux';
import '../shim.js';
const StellarSdk = require('stellar-sdk');
StellarSdk.Network.useTestNetwork();
var server = new StellarSdk.Server('https://horizon-testnet.stellar.org');

export const sendInfoUpdate = ({prop, value}) => {
	return {
		type: SEND_INFO_UPDATE,
		payload: { prop, value }
	};
};
 
export const sendTokensToAddress = ({address, amount, tokenType}) => {
	return (dispatch) => {
		dispatch({type: SEND_TOKENS});
		let wallet;
		Expo.SecureStore.getItemAsync('seckey')
		.then(seckey => {
			wallet = StellarSdk.Keypair.fromSecret(seckey);
			console.log(wallet.canSign());
			return Expo.SecureStore.getItemAsync('pubkey');
		})
		.then(pubkey=>{
			return server.loadAccount(pubkey);
		})	
		.then(function(account) {
		  console.log("building payment transaction");
		  let asset;
		  if (tokenType.asset_code) {
		  	asset = new StellarSdk.Asset('NCNT', 'GBWOFUTXKI7IANMVHGBZX7KKK4LDDH7OVJ4C3WLX4V7M3WH2OKPBQEN5');
		  }
		  else {
		  	asset = StellarSdk.Asset.native();
		  }
		  console.log(wallet);
		  var transaction = new StellarSdk.TransactionBuilder(account)
		  .addOperation(StellarSdk.Operation.payment({
		  	destination: address,
		  	amount: amount,
		  	asset: asset	
		  }))
		  .build();
		  transaction.sign(wallet);
		  console.log("submitting trust transaction");
		  return server.submitTransaction(transaction);
		})
		.then( () => {
			console.log("success");
			dispatch({type: SEND_TOKENS_SUCCESS});	
			setTimeout(()=> {Actions.refresh({refresh: true})}, 250);
			Actions.pop();
		})
		.catch(error => {
			console.log("error");
			console.log(error);
			dispatch({type: SEND_TOKENS_FAIL, payload: "Error Sending Tokens"});
		});
	};
};


export const cancelTransaction = () => {
	return (dispatch) => {
		dispatch({type: CLEAR_TRANSACTION_INPUTS});
		Actions.pop();
	};
};