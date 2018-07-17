import firebase from 'firebase';
import {USER_UPDATE, CREATE_USER, CREATE_USER_SUCCESS, CREATE_USER_FAIL} from './types';
import {Actions} from 'react-native-router-flux';

export const userUpdate = ({prop, value}) => {
	return {
		type: USER_UPDATE,
		payload: { prop, value }
	};
};

export const createUser = ({first, last, email, username, phone, password, confirm}) => {
	return (dispatch) => {
		dispatch({type: CREATE_USER});

		firebase.auth().createUserWithEmailAndPassword(email, password)
			.then(user => {
				// create wallet, get address, pk
				firebase.database().ref(`/users/${user.user.uid}/information`)
					.push({first, last, email, username, phone})
					.then( () => {
				 		dispatch({type: CREATE_USER_SUCCESS, payload: user});
						Actions.LoginScreen();
					})
					.catch(() => {

					});
			})
			.catch(() => {
				dispatch({type: CREATE_USER_FAIL});
			});
	};
}
   