import firebase from 'firebase';
import {SEND_INFO_UPDATE, SEND_TOKENS, SEND_TOKENS_SUCCESS, SEND_TOKENS_FAIL, CLEAR_TRANSACTION_INPUTS} from './types';
import {Actions} from 'react-native-router-flux';
import ncentSDK from 'ncent-sdk-public';

const ncentSDKInstance = new ncentSDK();

export const sendInfoUpdate = ({prop, value}) => {
	return {
		type: SEND_INFO_UPDATE,
		payload: { prop, value }
	};
};

export const sendTokensToAddress = ({address, amount, tokenType}) => {
	return (dispatch) => {
		dispatch({type: SEND_TOKENS});

		const {currentUser} = firebase.auth();
		const user_email = currentUser.email;
		new Promise(function(resolve, reject) {
			console.log("sending tokens");
			ncentSDKInstance.transferTokens(user_email, address.toLowerCase(), tokenType, amount, resolve);
		})
		.then( () => {
			console.log("success");
			dispatch({type: SEND_TOKENS_SUCCESS});	
			setTimeout(()=> {Actions.refresh({refresh: true})}, 500);
			Actions.pop();
		})
	};
};


export const cancelTransaction = () => {
	return (dispatch) => {
		dispatch({type: CLEAR_TRANSACTION_INPUTS});
		Actions.pop();
	};
};