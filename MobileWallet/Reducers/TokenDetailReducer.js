import {GET_BALANCE, GET_BALANCE_SUCCESS} from '../Actions/types';

const INITIAL_STATE = {
	balance: 6,
	error: '',
	loading: false
};

export default (state = INITIAL_STATE, action) => {
	switch(action.type) {
		case GET_BALANCE:
			return {...state, loading: true, error: ''};
		case GET_BALANCE_SUCCESS:
			return {...state, loading: false, error: '', balance: action.payload};
		default:
			return state;
	}

};   