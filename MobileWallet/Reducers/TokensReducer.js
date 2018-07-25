import {GET_ALL_TOKENS, GET_TOKENS_SUCCESS, GET_TOKENS_FAIL} from '../Actions/types';

const INITIAL_STATE = {
	error: '',
	loading: false,
	allTokens: []
};

export default (state = INITIAL_STATE, action) => {
	switch(action.type) {
		case GET_TOKENS_SUCCESS:
			return {...state, allTokens: action.payload, loading: false};
		case GET_ALL_TOKENS:
			return {...state, loading: true};
		case GET_TOKENS_FAIL:
			return {...state, loading: false, error: 'Error getting tokens'};
		default:
			return state;
	}

};   