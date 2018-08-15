import {USER_UPDATE, CREATE_USER, CREATE_USER_SUCCESS, CREATE_USER_FAIL, TEMP_PIN_ENTERED, PINS_DONT_MATCH} from '../Actions/types';

const INITIAL_STATE = {
	first: '',
	last: '',
	email: '',
	username: '',
	pin: '',
	confirm: '',
	phone: '',
	error: '',
	tempPin: '',
	loading: false
};

export default (state = INITIAL_STATE, action) => {
	switch(action.type) {
		case USER_UPDATE:
			return {...state, [action.payload.prop]: action.payload.value};
		case CREATE_USER:
			return {...state, ...INITIAL_STATE, loading: true, error: ''};
		case CREATE_USER_SUCCESS:
			return {... state, ...INITIAL_STATE};
		case CREATE_USER_FAIL:
			return {... state, tempPin: '', pin: '', loading: false, error: 'Sign Up Failed.'};
		case TEMP_PIN_ENTERED:
			return {... state, pin: '', tempPin: action.payload, error: ''};
		case PINS_DONT_MATCH:
			return {... state, pin: '', tempPin: '', error: 'Pins Don\'t Match'};
		default:
			return state;
	}

};  