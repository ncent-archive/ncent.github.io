import axios from 'axios';

export const RECEIVE_USER = "RECEIVE_USER";
export const RECEIVE_USERS = "RECEIVE_USERS";
export const RECEIVE_AUTH_ERRORS = "RECEIVE_AUTH_ERRORS";

const receiveUser = (user) => ({
  type: RECEIVE_USER,
  user
});

const receiveAuthErrors = (errors) => ({
  type: RECEIVE_AUTH_ERRORS,
  errors
});

export const createUser = (user) => (dispatch) => {
  axios.post('/api/users', {
    user
  }).then(({data})=>{dispatch(receiveUser(data.user));})
    .catch((err)=>dispatch(receiveAuthErrors(err)));
};
