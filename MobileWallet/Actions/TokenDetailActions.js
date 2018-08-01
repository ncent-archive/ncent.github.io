import firebase from 'firebase';
import {GET_BALANCE, GET_BALANCE_SUCCESS, GET_BALANCE_FAIL} from './types';
import {Actions} from 'react-native-router-flux';
import ncentSDK from 'ncent-sdk-public';

const ncentSDKInstance = new ncentSDK();

export const getTokenBalance = ({tokenType}) => {
	return (dispatch) => {
		// dispatch({type: GET_BALANCE});
		const {currentUser} = firebase.auth();
		const address = currentUser.email

        new Promise(function(resolve, reject) {
			console.log("getting token balance");
			ncentSDKInstance.getTokenBalance(address, tokenType, resolve);
		})
		.then( response => {
			console.log(response.data[0]);
			dispatch({type: GET_BALANCE_SUCCESS, payload: response.data[0].balance});
		})

		// hmmm, somehow set balance to the balance retrived
		// i bookmarked it. 
		// dispatch({type: GET_BALANCE_SUCCESS, payload: snapshot.val for firebase, idk about SDK})
	};
}; 