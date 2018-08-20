import React, { Component } from 'react';
import Header from './Header';
import Form from './Form';
import './style.css';

class Auth extends Component {
  render() {
    const { formInfo, user, history, action } = this.props;
    return (
      <div className="Auth">
        <Header />
        <Form
          action={action}
          user={user}
          formInfo={formInfo}
          history={history}/>
      </div>
    );
  }
}

export default Auth;
