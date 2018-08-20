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

const Routes = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route path="/students" component={App} />
          <Route path="/tutors" component={App} />
          <Redirect to="/" />
        </Switch>
        <Switch>
          <Route exact path="/students" component={Students} />
          <Route exact path="/tutors" component={Tutors} />
        </Switch>
      </div>
    </Router>
  );
};

export default Routes;
