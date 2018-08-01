import firebase from 'firebase';
import {MAITRE_EMAIL_CHANGED, MAITRE_SIGNUP_SUCCESS, MAITRE_SIGNUP_FAIL, MAITRE_SIGNUP_SUBMIT} from './types';
import {Actions} from 'react-native-router-flux';
import Expo from 'expo';

// const CryptoJS = require("crypto-js");
//import '../shim.js'
//import crypto from 'crypto';
//const bip39 = require('react-native-bip39');

export const maitreEmailChanged = (text) => {
	return {
		type: MAITRE_EMAIL_CHANGED,
		payload: text
	};
};
 
export const maitreSubscribe = ({email}) => {
	console.log("trying to subscribe");
	const uuid = 'MFfa1aa24de7'
	const base_url = "https://maitreapp.co/api/v2/lists/"+ uuid +"/subscribers";
	const payload = {
	  api_token: "token",
	  hosting_url: "https://ncent.io/",
	  email: email
	};


	 // npm i -S bip39
	// const crypto = require('crypto-js');

	// // what you describe as 'seed'
	// const randomBytes = crypto.randomBytes(16); // 128 bits is enough

	// // your 12 word phrase
	// const mnemonic = bip39.entropyToMnemonic(randomBytes.toString('hex'));

	// // what is accurately described as the wallet seed
	// const seed = bip39.mnemonicToSeed(mnemonic); // you'll use this in #3 below
	// console.log(seed);

	return (dispatch) => {
		// dispatch({type: MAITRE_SIGNUP_SUBMIT});
		// fetch(base_url, {
		// method: 'POST',
		// headers: {
		//     Accept: 'application/json',
		//     'Content-Type': 'application/json',
		//   },
		//   body: JSON.stringify(payload),
		// })
		// .then((response) => {
		// 	if (response.status === 200) {
		// 		console.log("success");
		// 		dispatch({type: MAITRE_SIGNUP_SUCCESS});
		// 	}
		// 	else {
		// 		dispatch({type: MAITRE_SIGNUP_FAIL});
		// 	}
		// })
		


	};
};





