import firebase from 'firebase';
import {GET_ALL_TOKENS, GET_TOKENS_SUCCESS, GET_TOKENS_FAIL} from './types';
import {Actions} from 'react-native-router-flux';
import ncentSDK from 'ncent-sdk-public';

const ncentSDKInstance = new ncentSDK();


export const getTokens = () => {
	return (dispatch) => {
		const {currentUser} = firebase.auth();
		const address = currentUser.email;
        new Promise(function(resolve, reject) {
			console.log("getting all tokens");
			console.log(address);
			ncentSDKInstance.getAllBalances(address, resolve);
		})
		.then( response => {
			console.log(response);
			dispatch({type: GET_TOKENS_SUCCESS, payload: response.data});
		})
		// hmmm, somehow set balance to the balance retrived
		// i bookmarked it. 
		// dispatch({type: GET_BALANCE_SUCCESS, payload: snapshot.val for firebase, idk about SDK})
	};
}

export const signOut = () => {
	return (dispatch) => {
		firebase.auth().signOut()
			.then( () => {
				Actions.popTo("LoginOrSignup");
			})
	}
} 