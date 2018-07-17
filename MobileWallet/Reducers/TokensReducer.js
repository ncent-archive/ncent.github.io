import {GET_ALL_TOKENS, GET_TOKENS_SUCCESS} from '../Actions/types';

const INITIAL_STATE = {
	error: '',
	loading: false,
	allTokens: []
};

export default (state = INITIAL_STATE, action) => {
	switch(action.type) {
		case GET_TOKENS_SUCCESS:
			return {...state, allTokens: action.payload};
		default:
			return state;
	}

};   