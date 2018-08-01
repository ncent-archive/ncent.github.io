import firebase from 'firebase';
import {USER_UPDATE, CREATE_USER, CREATE_USER_SUCCESS, CREATE_USER_FAIL} from './types';
import {Actions} from 'react-native-router-flux';
import {Alert} from 'react-native';
import ncentSDK from 'ncent-sdk-public';

const ncentSDKInstance = new ncentSDK();

export const userUpdate = ({prop, value}) => {
	return {
		type: USER_UPDATE,
		payload: { prop, value }
	};
};

let ncentuuid;

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
			// new Promise(function(resolve, reject) {
			// 	// when you need to make a new ncentSDK instance:
			// 	console.log("making tokenid");
			// 	return ncentSDKInstance.initNCNT(resolve);
			// })
			// .then(()=> {
			// 	new Promise(function(resolve,reject) {
			// 		ncentSDKInstance.getAllBalances("company@ncnt.io", resolve);
			// 	})
			// 	.then(response => {return response;});
			// })
			
			new Promise( function(resolve, reject) {
				ncentSDKInstance.getAllBalances("company@ncnt.io", resolve);
			})

			.then(response => {
				console.log("making wallet");
				console.log(response);
				console.log(response.data);
				ncentuuid = response.data[0].tokentype_uuid;
				ncentSDKInstance.createWalletAddress(email.toLowerCase(), ncentuuid, function(response){});
			})
			.then( () => {
				console.log("giving some tokens on signup cause why not");
				console.log(ncentuuid);
		 		ncentSDKInstance.transferTokens("company@ncnt.io", email.toLowerCase(), ncentuuid, 100, function(){});
			})
			.then( () => {
				console.log("no shot we get here");
		 		dispatch({type: CREATE_USER_SUCCESS, payload: new_user});
				Actions.LoginScreen();
			})
			.catch(error => {
				console.log("this error");
				new_user.delete();
				Alert.alert("Server Error");
				dispatch({type: CREATE_USER_FAIL, payload: "Server Error"});
			});
		})
		.catch(error => {
			console.log("no, this error");
			Alert.alert(error.toString());
			dispatch({type: CREATE_USER_FAIL, payload: error.toString()});
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
