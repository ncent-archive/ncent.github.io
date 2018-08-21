import { combineReducers } from 'redux';
import usersReducer from './usersReducer';
import errorsReducer from './errorsReducer';
import sessionReducer from './sessionReducer';

const rootReducer = combineReducers({
    users: usersReducer,
    errors: errorsReducer,
    session: sessionReducer
});

export default rootReducer;
