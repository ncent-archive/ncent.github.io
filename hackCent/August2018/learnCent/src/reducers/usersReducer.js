import {
  RECEIVE_USER,
  RECEIVE_USERS,
  RECEIVE_CURRENT_USER
} from '../actions/user_actions';

const initialState = {};

const usersReducer = (state = initialState, action) => {
  const newState = Object.assign({}, state);
  switch (action.type) {
    case RECEIVE_USER:
      newState[action.user.id] = action.user;
      return newState;
    case RECEIVE_CURRENT_USER:
      newState[action.user.id] = action.user;
      return newState;
    case RECEIVE_USERS:
      Object.assign(newState, action.users);
      return newState;
    default:
      return state;
  }
};

export default usersReducer;
