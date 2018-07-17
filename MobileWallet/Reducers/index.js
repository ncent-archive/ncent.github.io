import {combineReducers} from 'redux';
import AuthReducer from './AuthReducer';
import SignupReducer from './SignupReducer';
import SendTokensReducer from './SendTokensReducer';
import TokenDetailsReducer from './TokenDetailReducer';
import TokensReducer from './TokensReducer';

export default combineReducers({
	 auth: AuthReducer,
	 signup: SignupReducer,
	 sendTokens: SendTokensReducer,
	 tokenDetails: TokenDetailsReducer,
	 tokens: TokensReducer
});

 