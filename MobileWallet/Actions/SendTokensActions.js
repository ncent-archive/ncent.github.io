import firebase from 'firebase';
import {SEND_INFO_UPDATE, SEND_TOKENS, SEND_TOKENS_SUCCESS, SEND_TOKENS_FAIL, CLEAR_TRANSACTION_INPUTS} from './types';
import {Actions} from 'react-native-router-flux';

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
		//const address = currentUser.email
			//send tokens,
					//.then(dispatch ({type: SEND_TOKENS_SUCCESS}))
					//.catch
			//
			//.catch(failed)
			// dispatch({type: SEND_TOKENS_FAIL})
	};
};


export const cancelTransaction = () => {
	return (dispatch) => {
		dispatch({type: CLEAR_TRANSACTION_INPUTS});
		Actions.pop();
	};
};