import axios from 'axios';

export const RECEIVE_CURRENT_USER_TOKEN_COUNT =
  "RECEIVE_CURRENT_USER_TOKEN_COUNT";
export const RECEIVE_TOKEN_ERRORS = "RECEIVE_TOKEN_ERRORS";

const receiveCurrentUserTokenCount = (tokenCount) => ({
  type: RECEIVE_CURRENT_USER_TOKEN_COUNT,
  tokenCount
});

const receiveTokenErrors = (tokenErrors) => ({
  type: RECEIVE_TOKEN_ERRORS,
  tokenErrors
});

export const fetchTokenCount = () => (dispatch) => {
  axios.get('/api/users/tokens')
  .then(({data})=>dispatch(receiveCurrentUserTokenCount(data.tokenCount)))
  .catch(({response})=>dispatch(receiveTokenErrors(response.data.errors)));
};
