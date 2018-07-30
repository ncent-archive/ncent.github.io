import {combineReducers} from 'redux';
import AuthReducer from './AuthReducer';
import SignupReducer from './SignupReducer';
import SendTokensReducer from './SendTokensReducer';
import TokenDetailsReducer from './TokenDetailReducer';
import TokensReducer from './TokensReducer';
import MaitreSignupReducer from './MaitreSignupReducer';
import {USER_LOGOUT} from '../Actions/types';


const appReducer = combineReducers({
	 auth: AuthReducer,
	 signup: SignupReducer,
	 sendTokens: SendTokensReducer,
	 tokenDetails: TokenDetailsReducer,
	 tokens: TokensReducer,
	 maitre: MaitreSignupReducer
});

const rootReducer = (state, action) => {
	if (action.type === USER_LOGOUT) {
	    state = undefined;
	 }
	return appReducer(state, action);
}

export default rootReducer;