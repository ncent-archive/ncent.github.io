import firebase from 'firebase';
import {GET_ALL_TOKENS, GET_TOKENS_SUCCESS} from './types';
import {Actions} from 'react-native-router-flux';


export const getTokens = () => {
	return (dispatch) => {
		// const {currentUser} = firebase.auth();
		// currentUser.address
		const allTokens = [
                {key: 'nCent'},
                {key: 'fanCent'},
                {key: 'jobCent'},
                {key: 'buildCent'}
              ];
		dispatch({type: GET_TOKENS_SUCCESS, payload: allTokens});
		// hmmm, somehow set balance to the balance retrived
		// i bookmarked it. 
		// dispatch({type: GET_BALANCE_SUCCESS, payload: snapshot.val for firebase, idk about SDK})
	};
}

export const signOut = () => {
	return (dispatch) => {
		console.log("now here");
		firebase.auth().signOut()
			.then( () => {
				Actions.popTo("LoginOrSignup");
			})
	}
}