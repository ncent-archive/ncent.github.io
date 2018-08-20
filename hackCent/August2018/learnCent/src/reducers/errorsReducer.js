import {
  RECEIVE_USER,
  RECEIVE_USERS,
  RECEIVE_AUTH_ERRORS
} from '../actions/user_actions';

const initialState = [];

const errorsReducer = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_USER:
      return initialState;
    case RECEIVE_USERS:
      return initialState;
    case RECEIVE_AUTH_ERRORS:
      return action.errors;
    default:
      return state;
  }
};

export default errorsReducer;
