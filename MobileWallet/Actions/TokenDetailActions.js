import {GET_BALANCE, GET_BALANCE_SUCCESS, GET_BALANCE_FAIL} from './types';
import {Actions} from 'react-native-router-flux';
import '../shim.js';
const StellarSdk = require('stellar-sdk');
StellarSdk.Network.useTestNetwork();
var server = new StellarSdk.Server('https://horizon-testnet.stellar.org');

// import ncentSDK from 'ncent-sdk-public';

// const ncentSDKInstance = new ncentSDK();

export const getTokenBalance = ({tokenType}) => {
	return (dispatch) => {
		// dispatch({type: GET_BALANCE});
		Expo.SecureStore.getItemAsync('pubkey')
		.then(pubkey=>{
			console.log(pubkey);
			return server.loadAccount(pubkey);
		})	
		.then( response => {
			let updatedTokenType;
			if (tokenType.asset_code) {
				console.log("this");
				updatedTokenType = response.balances.filter(obj => { return obj.asset_code === tokenType.asset_code })[0]
			}
			else {
				console.log("or this");
				updatedTokenType = response.balances.filter(obj => { return obj.asset_type === 'native' })[0]
			}
			console.log(response.balances);
			console.log("UPDATE", updatedTokenType);
			dispatch({type: GET_BALANCE_SUCCESS, payload: updatedTokenType.balance});
		})
		// .then( response => {
			
		// })
	};
}; 