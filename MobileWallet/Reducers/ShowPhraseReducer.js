import {SHOW_PHRASE, HIDE_PHRASE} from '../Actions/types';

const INITIAL_STATE = {
	error: '',
	success: '',
	phrase: '', 
	phraseVisible: false,
	loading: false
};

export default (state = INITIAL_STATE, action) => {
	switch(action.type) {
		case SHOW_PHRASE:
			return {...state, phraseVisible: true, phrase: action.payload}
		case HIDE_PHRASE:
			return {...state, phraseVisible: false, phrase: ''}
		default:
			return state;
	}

};