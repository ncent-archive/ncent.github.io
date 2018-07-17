import firebase from 'firebase';
import {GET_BALANCE, GET_BALANCE_SUCCESS} from './types';
import {Actions} from 'react-native-router-flux';


export const getTokenBalance = ({tokenType}) => {
	return (dispatch) => {
		const {currentUser} = firebase.auth();
		// currentUser.address
		dispatch({type: GET_BALANCE_SUCCESS, payload: 5});
		// hmmm, somehow set balance to the balance retrived
		// i bookmarked it. 
		// dispatch({type: GET_BALANCE_SUCCESS, payload: snapshot.val for firebase, idk about SDK})
	};
}