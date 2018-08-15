import {GET_ALL_TOKENS, GET_TOKENS_SUCCESS, GET_TOKENS_FAIL, USER_LOGOUT} from './types';
import {Actions} from 'react-native-router-flux';
import Expo from 'expo';
import '../shim.js';
const StellarSdk = require('stellar-sdk');
StellarSdk.Network.useTestNetwork();
var server = new StellarSdk.Server('https://horizon-testnet.stellar.org');

// import ncentSDK from 'ncent-sdk-public';

// const ncentSDKInstance = new ncentSDK();


export const getTokens = () => {
	return (dispatch) => {

		Expo.SecureStore.getItemAsync('pubkey')
		.then(pubkey=>{
			console.log(pubkey);
			return server.loadAccount(pubkey);
		})	
		.then( response => {
			console.log(response.balances);
			dispatch({type: GET_TOKENS_SUCCESS, payload: response.balances});
		})
		// hmmm, somehow set balance to the balance retrived
		// i bookmarked it. 
		// dispatch({type: GET_BALANCE_SUCCESS, payload: snapshot.val for firebase, idk about SDK})
	};
}
