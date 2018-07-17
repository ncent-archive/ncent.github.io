import {SEND_INFO_UPDATE, SEND_TOKENS, CLEAR_TRANSACTION_INPUTS} from '../Actions/types';

const INITIAL_STATE = {
	address: '',
	amount: '',
	error: '',
	loading: false
};

export default (state = INITIAL_STATE, action) => {
	switch(action.type) {
		case SEND_INFO_UPDATE:
			return {...state, [action.payload.prop]: action.payload.value};
		case SEND_TOKENS:
			return {...state, loading: true, error: ''}
		case CLEAR_TRANSACTION_INPUTS:
			return INITIAL_STATE;
		default:
			return state;
	}

};  