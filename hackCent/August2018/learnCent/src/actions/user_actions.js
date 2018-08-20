import axios from 'axios';

export const RECEIVE_USER = "RECEIVE_USER";
export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const RECEIVE_USERS = "RECEIVE_USERS";
export const RECEIVE_AUTH_ERRORS = "RECEIVE_AUTH_ERRORS";

const receiveUser = (user) => ({
  type: RECEIVE_USER,
  user
});

const receiveCurrentUser = (user) => ({
  type: RECEIVE_CURRENT_USER,
  user
});

const receiveAuthErrors = (errors) => ({
  type: RECEIVE_AUTH_ERRORS,
  errors
});

export const createUser = (user) => (dispatch) => {
  axios.post('/api/users', {
    user
  }).then(({data})=>{dispatch(receiveCurrentUser(data.user));})
    .catch(({response})=>dispatch(receiveAuthErrors(response.data.errors)));
};

export const loginUser = (user) => (dispatch) => {
  axios.post('/api/session', {
    user
  }).then(({data})=>dispatch(receiveCurrentUser(data.user)))
    .catch(({response})=>dispatch(receiveAuthErrors(response.data.errors)));
};

// export const fetchUser = userId => dispatch => {
//   axios.get(`/api/users/${userId}`, {
//     userId
//   }).then(({data})=>dispatch(receiveCurrentUser(data.user)))
//     .catch(({response})=>dispatch(receiveAuthErrors(response.data.errors)));
// };
//
// export const fetchUsers = userId => dispatch => {
//   axios.get('/api/users', {
//     userId
//   }).then(({data})=>dispatch(receiveCurrentUser(data.users)))
//     .catch(({response})=>dispatch(receiveAuthErrors(response.data.errors)));
// };
