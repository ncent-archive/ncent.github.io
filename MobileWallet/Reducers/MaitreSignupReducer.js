import {MAITRE_EMAIL_CHANGED, MAITRE_SIGNUP_SUCCESS, MAITRE_SIGNUP_FAIL, MAITRE_SIGNUP_SUBMIT} from '../Actions/types';

const INITIAL_STATE = {
	email: '',
	error: '',
	success: '',
	loading: false
};

export default (state = INITIAL_STATE, action) => {
	switch(action.type) {
		case MAITRE_SIGNUP_SUCCESS:
			return {...state, ...INITIAL_STATE, success: 'Successfully signed up!'};
		case MAITRE_SIGNUP_FAIL:
			return {...state, ...INITIAL_STATE, error: 'Make sure you entered a valid email.'};
		case MAITRE_SIGNUP_SUBMIT:
			return {...state, email: action.payload, loading: true};
		case MAITRE_EMAIL_CHANGED:
			return {...state, email: action.payload};
		default:
			return state;
	}

};