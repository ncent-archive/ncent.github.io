import {SEND_INFO_UPDATE, SEND_TOKENS, SEND_TOKENS_SUCCESS, SEND_TOKENS_FAIL, CLEAR_TRANSACTION_INPUTS} from '../Actions/types';

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
		case SEND_TOKENS_SUCCESS:
			return {...INITIAL_STATE}
		case SEND_TOKENS_FAIL:
			return {...INITIAL_STATE, loading: false, error: 'Send Tokens Failed'}
		case CLEAR_TRANSACTION_INPUTS:
			return INITIAL_STATE;
		default:
			return state;
	}

}; 