import firebase from 'firebase';
import {USER_UPDATE, CREATE_USER, CREATE_USER_SUCCESS, CREATE_USER_FAIL} from './types';
import {Actions} from 'react-native-router-flux';
import ncentSDK from 'ncent-sdk-public';

const ncentSDKInstance = new ncentSDK();

export const userUpdate = ({prop, value}) => {
	return {
		type: USER_UPDATE,
		payload: { prop, value }
	};
};

const ncentuuid = 'c8e35e05-27f2-4306-be59-bc344897504a';

export const createUser = ({first, last, email, username, phone, password, confirm}) => {
	return (dispatch) => {
		dispatch({type: CREATE_USER});
		// check if wallet address exists, return error if so
		let new_user = undefined;
		firebase.auth().createUserWithEmailAndPassword(email, password)
		.then(user => {
			new_user = user;
			console.log("here");
			firebase.database().ref(`/users/${user.user.uid}/information`)
			.push({});
			console.log("and here");
					
		})
		.then(()=> {
			console.log("now here");
			new Promise(function(resolve, reject) {
				// when you need to make a new ncentSDK instance:
				// console.log("making tokenid");
				// return ncentSDKInstance.initNCNT(resolve);
				console.log("making wallet");
				ncentSDKInstance.createWalletAddress(email.toLowerCase(), ncentuuid, resolve);
			})
			// making wallet after you've made a new ncent sdk instance
			// .then(function(response) {
			// 	console.log("making wallet");
			// 	ncentSDKInstance.createWalletAddress(email, response.data.tokenTypeResponseData.uuid, function(response){});
			// })
			.then( () => {
				console.log("giving some tokens on signup cause why not");
		 		ncentSDKInstance.transferTokens("company@ncnt.io", email.toLowerCase(), ncentuuid, 10, function(response){});
			})
			.then( () => {
				console.log("no shot we get here");
		 		dispatch({type: CREATE_USER_SUCCESS, payload: new_user});
				Actions.LoginScreen();
			})
			.catch(error => {
				console.log("this error");
				dispatch({type: CREATE_USER_FAIL});
				console.log(error);
			});
		})
		.catch(error => {
			console.log("no, this error");
			dispatch({type: CREATE_USER_FAIL});
			console.log(error);
		});
		// new Promise(function(resolve, reject) {
		// 	ncentSDKInstance.initNCNT();
		// })
		// .then( () => {
	 // 		dispatch({type: CREATE_USER_SUCCESS, payload: new_user});
		// 	Actions.LoginScreen();
		// })
		// .catch(error => {
		// 	dispatch({type: CREATE_USER_FAIL});
		// 	console.log(error);
		// });
	};
};
