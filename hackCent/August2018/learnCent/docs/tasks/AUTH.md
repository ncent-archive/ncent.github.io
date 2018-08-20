# User Auth

## Frontend

### Components / Containers
- [ ] Improve `<ul>` design inside of Students Component
- [ ] Improve `<ul>` design inside of Tutors Component
- [ ] Auth Errors
  - [ ] Map errors from LoginContainer + SignupContainer to Auth
  - [ ] Pass these errors as props to the Auth Form
  - [ ] Render any errors above the email/password inputs
- [ ] Dispatch thunk action for user creation on form submission

### Actions
- [ ] User Creation
  - [ ] RECEIVE_USER constant
  - [ ] RECEIVE_USERS constant
  - [ ] AUTH_ERRORS constant
  - [ ] receiveAuthErrors (dispatches AUTH_ERRORS, errors)
  - [ ] receiveUser (dispatches RECEIVE_USER, user)
  - [ ] receiveUsers (dispatches RECEIVE_USERS, users)
  - [ ] createUser ((axios POST `users/`).then(receiveUser))
    - [ ] catch errors and dispatch AUTH_ERRORS
  - [ ] fetchUser ((axios GET `users/${id}`).then(receiveUser))
  - [ ] fetchUsers ((axios GET `users/`).then(receiveUsers))

### Reducers
  - [ ] usersReducer
    - [ ] Manage RECEIVE_USER
    - [ ] Manage RECEIVE_USERS
  - [ ] sessionReducer
    - [ ] holds currentUser data
  - [ ] errorsReducer
    - [ ] Manage AUTH_ERRORS
  - [ ] entitiesReducer
    - [ ] users: usersReducer
  - [ ] rootReducer
    - [ ] entities: entitiesReducer
    - [ ] errors: errorsReducer
    - [ ] session: sessionReducer

### Routes
  - [ ] AuthRoute
    - Route that redirects an authenticated user
    - Ex: This will be used in the router as a route for `/login` to redirect an authenticated user to the `/tutors` or `/students` page
  - [ ] ProtectedRoute
    - Route that redirects an unauthenticated user
    - Ex: This will be used to prevent redirect unauthenticated users from any page besides `/tutors` or `/students`
  - Similar code example (session slice of Redux state may be different):
  ```javascript
    import React from 'react';
    import { connect } from 'react-redux';
    import { Route, Redirect, withRouter } from 'react-router-dom';

    const Auth = ({ component: Component, path, loggedIn, exact }) => (
      <Route path={path} exact={exact} render={props=> (
        loggedIn ? (
          <Redirect to="/chats" />
        ) : (
          <Component {...props} />
        )
      )} />
    );

    const Protected = ({ component: Component, path, loggedIn, exact }) => (
      <Route path={path} exact={exact} render={(props) => (
         loggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        )
      )} />
    );

    const mapStateToProps = state => (
      {loggedIn: Boolean(state.session.id)}
    );

    export const AuthRoute = withRouter(connect(mapStateToProps)(Auth));
    export const ProtectedRoute = withRouter(connect(mapStateToProps)(Protected));
  ```

## Backend

### Models
  - [ ] User
    - [ ] email, `not null`
    - [ ] password_digest, `not null`
    - [ ] session_token, `not null`
    - [ ] public_key, `not null` (will be created before user persist)
    - [ ] private_key `not null` (will be created before user persist)
### Controllers
  - [ ] UsersController
    - [ ] Handle user sign up
  - [ ] SessionController
    - [ ] Login
      - [ ] Establish user's session_token as a safe base64 string
        - [ ] Persist change to DB
      - [ ] Store this sessionToken in the application's session
    - [ ] Logout
      - [ ] Reset user's sessionToken
      - [ ] Clear session's sessionToken

### Server API
  - [ ] POST `users` (user creation, returns user)
  - [ ] GET `users` (returns all users)
  - [ ] GET `users/${id}` (returns user with `id`)

### Sandbox API calls using SDK

#### Reference material
 - These API calls will need to use the SDK located at [/SDK/source/ncentSDK.js](../../../../SDK/source/ncentSDK.js)
 - Usage: [/SDK/](../../../../SDK/)
 - You must be running the [Sandbox](../../../../Sandbox/Sandbox%20API/) for the SDK to interact with

#### Functionality
 - [ ] createUserWallet(userId)
  - invokes SDK createWalletAddress
  - saves public and private key to database under user model
 - [ ] transferTokens(fromUserId, toUserId, amount)
  - `const StellarSdk = require('stellar-sdk');`
  - const fromPrivateKey = (get private key of fromUserId)
  - const fromPublicKey = (get public key of fromUserId)
  - const toPublicKey = (get public key of toUserId)
  - const fromKeyPair = (construct new [stellar Keypair](https://stellar.github.io/js-stellar-sdk/Keypair.html))
    - {publicKey: fromPublicKey, privateKey: fromPrivateKey}
  - const tokenId = (get user's token id from university association)
  - invoke SDK's `transferTokens` with:
    - (fromKeyPair, toPublicKey, tokenId, amount, resolve, reject)
 - [ ] getTokenBalance(userId)
  - get user publicKey from database
  - get user tokenId from university association
  - Invoke SDK's getTokenBalance; Return user's balance;

### Seeds
  - [ ] Create 5 user seeds like: {email: 'example@email.com', password: '123456'}
    - The user creation process must assign values to these columns:
      - password_digest
      - public_key
      - private_key

### Broader Semantics
  - We will have a University model. This university will initially stamp a token. Users will have a belongsTo association with this university which will allow them to get the tokenId for the university for transferring, etc.
  - We should decide on an implementation for the storage of the sessionToken. I believe it'd be best to take a minimalist approach with:
    - Only sessionToken is stored in session
    - currentUser will be identified by matching this session's sessionToken to the user with the matching token
    - Ability to get currentUser from any place in backend
