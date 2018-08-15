import {PASSWORD_CHANGED_IN_MODAL, LOGIN_USER_SUCCESS_IN_MODAL, LOGIN_USER_FAIL_IN_MODAL, LOGIN_USER_IN_MODAL} from '../Actions/types';
const INITIAL_STATE = {password: '', error: '', loading: false};
 
export default (state=INITIAL_STATE, action) => {
	switch (action.type) {
		case PASSWORD_CHANGED_IN_MODAL:
			return {...state, password: action.payload};
		case LOGIN_USER_IN_MODAL:
			return {...state, loading: true, error: ''}
		case LOGIN_USER_SUCCESS_IN_MODAL:
			return {... state, error: '', loading: false, password: ''};
		case LOGIN_USER_FAIL_IN_MODAL:
			return {... state, error: 'Authentication Failed.', password: '', loading: false};
		default:
			return state;
	}
};  