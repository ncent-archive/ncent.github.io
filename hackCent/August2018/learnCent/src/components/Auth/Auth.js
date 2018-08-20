import React, { Component } from 'react';
import Header from './Header';
import Form from './Form';
import './style.css';

class Auth extends Component {
  render() {
    const { formInfo, user, history, action, errors } = this.props;
    return (
      <div className="Auth">
        <Header />
        <Form
          action={action}
          user={user}
          formInfo={formInfo}
          history={history}
          errors={errors}/>
      </div>
    );
  }
}

export default Auth;
