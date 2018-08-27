import { combineReducers } from 'redux';
import usersReducer from './usersReducer';
import errorsReducer from './errorsReducer';
import sessionReducer from './sessionReducer';
import tokensReducer from './tokensReducer';

const rootReducer = combineReducers({
    users: usersReducer,
    tokens: tokensReducer,
    errors: errorsReducer,
    session: sessionReducer,
});

export default rootReducer;
