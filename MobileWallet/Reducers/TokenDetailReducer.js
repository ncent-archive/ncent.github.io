import {GET_BALANCE, GET_BALANCE_SUCCESS, GET_BALANCE_FAIL} from '../Actions/types';

const INITIAL_STATE = {
	balance: 6,
	error: '',
	loading: false
};

export default (state = INITIAL_STATE, action) => {
	switch(action.type) {
		case GET_BALANCE:
			return {...state, loading: true};
		case GET_BALANCE_SUCCESS:
			return {...state, loading: false, error: '', balance: action.payload};
		case GET_BALANCE_FAIL:
			return {...state, loading: false, error: 'Error retrieving balance', balance: 'error'};
		default:
			return state;
	}

};   