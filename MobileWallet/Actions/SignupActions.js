import firebase from 'firebase';
import {USER_UPDATE, CREATE_USER, CREATE_USER_SUCCESS, CREATE_USER_FAIL, TEMP_PIN_ENTERED, PINS_DONT_MATCH} from './types';
import {Actions} from 'react-native-router-flux';
import {Alert} from 'react-native';
import ncentSDK from 'ncent-sdk-public';

import Expo from 'expo';
import '../shim.js';
// import StellarHDWallet from 'stellar-hd-wallet';
const crypto = require('crypto');
const bip39 = require('bip39');

const StellarSdk = require('stellar-sdk');
StellarSdk.Network.useTestNetwork();

var server = new StellarSdk.Server('https://horizon-testnet.stellar.org');
const axios = require('axios');

const ncentSDKInstance = new ncentSDK();
 
export const userUpdate = ({prop, value}) => {
	return {
		type: USER_UPDATE,
		payload: { prop, value }
	};
};

export const tempPinEntered = (tempPin) => {
	return (dispatch) => {
		dispatch({type: TEMP_PIN_ENTERED, payload: tempPin});
	}
};

export const pinsDontMatch = ({}) => {
	return (dispatch) => {
		dispatch({type: PINS_DONT_MATCH});
	}
};

let ncentuuid;

export const createUser = ({first, last, email, username, phone, pin}) => {
	return (dispatch) => {
		dispatch({type: CREATE_USER});
		// check if wallet address exists, return error if so
		// let new_user = undefined;
		// firebase.auth().createUserWithEmailAndPassword(email, password)
		// .then(user => {
		// 	new_user = user;
		// 	console.log("here");
		// 	firebase.database().ref(`/users/${user.user.uid}/information`)
		// 	.push({});
		// 	console.log("and here");
					
		// })
		
		// store user data on database


		
		// .then(()=> {
		// 	console.log("now here");
			
			// new Promise( function(resolve, reject) {
			// 	ncentSDKInstance.getAllBalances("company@ncnt.io", resolve);
			// })
			// .then(response => {
			// 	console.log("making wallet");
			// 	console.log(response);
			// 	console.log(response.data);
			// 	ncentuuid = response.data[0].tokentype_uuid;
			// 	ncentSDKInstance.createWalletAddress(email.toLowerCase(), ncentuuid, function(response){});
			// })
			// .then( () => {
				console.log("making wallet");
				const randomBytes = crypto.randomBytes(16);
				const mnemonic = bip39.entropyToMnemonic(randomBytes.toString('hex'));
				//const wallet = StellarHDWallet.fromMnemonic(mnemonic);
				// const pubkey = wallet.getPublicKey(0);
				// const seckey = wallet.getSecret(0);

				const wallet = StellarSdk.Keypair.random();
				const pubkey = wallet.publicKey();
				const seckey = wallet.secret();
				// const pubkey = 'GCJTZIGG3WWUGXI4PTXOXAZZTCGXKDTHHSNEJRMVYIN5WSO6EX7ARFFA';
				// const seckey = 'SDWSHSUV64TNP7SJOHVJYVSYIDST4NCFQ2XSXEK3DLFIAWK6MZBGFGRK';
				console.log(pubkey);
				console.log(seckey);

				fetch('https://friendbot.stellar.org?addr=' + pubkey)
				.then(response => {
					if (response.status === 200) {
						console.log("gave account money from friendbot");
						return server.loadAccount(pubkey);
					}
					else {
						console.log("uh oh");
						console.log(response);
						// handle error
					}
				})
				.then(function(account) {
				  console.log("trusting the ncnt wallet");
				  var NCNT = new StellarSdk.Asset('NCNT', 'GBWOFUTXKI7IANMVHGBZX7KKK4LDDH7OVJ4C3WLX4V7M3WH2OKPBQEN5');
				  var transaction = new StellarSdk.TransactionBuilder(account)
				  .addOperation(StellarSdk.Operation.changeTrust({
				  	destination: 'GB4IIY4IWZHCNPLCOY7IPYSZF6VUWGAVZ75JAPZSSUMYXPQQL44AB5L5',
				  	asset: NCNT	
				  }))
				  .build();
				  console.log('************************************************************');
				  console.log(wallet.canSign());
				  transaction.sign(wallet);
				  console.log("submitting trust transaction");
				  return server.submitTransaction(transaction);
				})
				.then(response => {
					console.log("success trusting");
					return server.loadAccount(pubkey);
				})
				.then(function(account) {
				  console.log("buying ncnt");
				  var NCNT = new StellarSdk.Asset('NCNT', 'GBWOFUTXKI7IANMVHGBZX7KKK4LDDH7OVJ4C3WLX4V7M3WH2OKPBQEN5');
				  var transaction = new StellarSdk.TransactionBuilder(account)
				  .addOperation(StellarSdk.Operation.manageOffer({
				  	destination: 'GB4IIY4IWZHCNPLCOY7IPYSZF6VUWGAVZ75JAPZSSUMYXPQQL44AB5L5',
				  	selling: StellarSdk.Asset.native(),
				  	buying: NCNT,
				  	amount: '5000',
				  	price: '.2'
				  }))
				  .build();
				  transaction.sign(wallet);
				  console.log("submitting purchase");
				  return server.submitTransaction(transaction);
				})
				
				.then(response =>{
					console.log(response);
					console.log("success purchasing ncnt");
					return Expo.SecureStore.setItemAsync('mnemonic', mnemonic)
				})
				.then(()=>{
					console.log("setting wallet");
					return Expo.SecureStore.setItemAsync('wallet', JSON.stringify(wallet))
				})
				.then(()=>{
					console.log("looking at response")

					return Expo.SecureStore.getItemAsync('wallet')
				})
				.then(()=>{
					console.log("getting wallet:")

					return Expo.SecureStore.setItemAsync('pubkey', pubkey)
				})
				.then(()=>{
					return Expo.SecureStore.setItemAsync('seckey', seckey)
				})
				.then(()=>{
					return Expo.SecureStore.setItemAsync('email', email)
				})
				.then(()=>{
					return Expo.SecureStore.setItemAsync('phone', phone)
				})
				.then(()=>{
					return Expo.SecureStore.setItemAsync('pin', pin)
				})
				.then(()=>{
					return Expo.SecureStore.setItemAsync('first', first)
				})
				.then(()=>{
					return Expo.SecureStore.setItemAsync('last', last)
				})
				.then(response => {
					dispatch({type: CREATE_USER_SUCCESS});
					Actions.TokensScreen();
				})
				.catch(error=>{
					console.log("error here");
					console.log(error);
				})
				
			// // })
			// // .then( () => {
			// // 	console.log("giving some tokens on signup cause why not");
			// // 	console.log(ncentuuid);
		 // // 		ncentSDKInstance.transferTokens("company@ncnt.io", email.toLowerCase(), ncentuuid, 100, function(){});
			// // })
			// 	.then( () => {
			// 		console.log("no shot we get here");
			//  		dispatch({type: CREATE_USER_SUCCESS});
			// 		Actions.LoginScreen();

			// 	})
				.catch(function(error) {
					console.log(error);
					console.log("this error");
					Alert.alert("Server Error");
					dispatch({type: CREATE_USER_FAIL, payload: "Server Error"});
				});
		}

		// .catch(error => {
		// 	console.log("no, this error");
		// 	Alert.alert(error.toString());
		// 	dispatch({type: CREATE_USER_FAIL, payload: error.toString()});
		// 	console.log(error);
		// });
};


