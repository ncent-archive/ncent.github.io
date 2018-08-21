import React from 'react';
import App from './containers/AppContainer';
import Login from './containers/LoginContainer';
import Signup from './containers/SignupContainer';
import Students from './containers/StudentsContainer';
import Tutors from './containers/TutorsContainer';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from './utils/route_utils';

const Routes = () => {
  return (
    <Router>
      <div>
        <Switch>
          <AuthRoute exact path="/" component={Login} />
          <AuthRoute exact path="/login" component={Login} />
          <AuthRoute exact path="/signup" component={Signup} />
          <ProtectedRoute path="/students" component={App} />
          <ProtectedRoute path="/tutors" component={App} />
          <Redirect to="/" />
        </Switch>
        <Switch>
          <ProtectedRoute exact path="/students" component={Students} />
          <ProtectedRoute exact path="/tutors" component={Tutors} />
        </Switch>
      </div>
    </Router>
  );
};

export default Routes;
