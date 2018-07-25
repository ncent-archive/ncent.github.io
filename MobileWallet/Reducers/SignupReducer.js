import {USER_UPDATE, CREATE_USER, CREATE_USER_SUCCESS, CREATE_USER_FAIL} from '../Actions/types';

const INITIAL_STATE = {
	first: '',
	last: '',
	email: '',
	username: '',
	password: '',
	confirm: '',
	phone: '',
	error: '',
	loading: false
};

export default (state = INITIAL_STATE, action) => {
	switch(action.type) {
		case USER_UPDATE:
			return {...state, [action.payload.prop]: action.payload.value};
		case CREATE_USER:
			return {...state, loading: true, error: ''};
		case CREATE_USER_SUCCESS:
			return {... state, ...INITIAL_STATE};
		case CREATE_USER_FAIL:
			return {... state, first: 'fail', loading: false, error: 'Sign Up Failed.'};
		default:
			return state;
	}

};   