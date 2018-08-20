import { combineReducers } from 'redux';
import usersReducer from './usersReducer';
import errorsReducer from './errorsReducer';

const rootReducer = combineReducers({
    users: usersReducer,
    errors: errorsReducer
});

export default rootReducer;
