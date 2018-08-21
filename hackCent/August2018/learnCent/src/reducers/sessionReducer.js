import {
  RECEIVE_CURRENT_USER
} from '../actions/user_actions';

const initialState = { id: null};

const sessionReducer = (state = initialState, action) => {
  const newState = Object.assign({}, state);
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      newState.id = action.user.id;
      return newState;
    default:
      return state;
  }
};

export default sessionReducer;
