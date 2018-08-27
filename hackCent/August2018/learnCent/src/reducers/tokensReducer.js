import {
  RECEIVE_CURRENT_USER_TOKEN_COUNT
} from '../actions/token_actions';

const initialState = { tokenCount: 0 };

const tokensReducer = (state = initialState, action) => {
  const newState = Object.assign({}, state);
  switch (action.type) {
    case RECEIVE_CURRENT_USER_TOKEN_COUNT:
      newState.tokenCount = action.tokenCount;
      return newState;
    default:
      return state;
  }
};

export default tokensReducer;
