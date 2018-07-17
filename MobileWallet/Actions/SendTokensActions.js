import firebase from 'firebase';
import {SEND_INFO_UPDATE, SEND_TOKENS, CLEAR_TRANSACTION_INPUTS} from './types';
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

		// firebase.auth.getAddress
			// .then( send tokens )
				// create wallet, get address, pk
					//.then(dispatch ({type: SEND_TOKENS_SUCCESS}))
					//.catch
			//
			//.catch(failed)
	};
};


export const cancelTransaction = () => {
	return (dispatch) => {
		dispatch({type: CLEAR_TRANSACTION_INPUTS});
		Actions.pop();
	};
};