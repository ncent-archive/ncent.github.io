import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = props.user;

    this.updateInput = this.updateInput.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  updateInput(attribute) {
    return (
      (e) => {
        this.setState({ [attribute]: e.target.value});
      });
  }

  submitForm(e) {
    e.preventDefault();
    // invoke action from props (dispatch)
    this.props.history.push('/students');
  }

  render() {
    const { buttonName, altLink, altPText, altLinkText } = this.props.formInfo;
    return (
        <form className="auth-form" onSubmit={this.submitForm}>
          <p
            className="auth-link">
            {altPText} <Link
              id="anchor-underline" to={altLink}>{altLinkText}
            </Link>
          </p>
          <input
            className="auth-input"
            type="text"
            placeholder="Username"
            value={this.state.username}
            onChange={this.updateInput('username')}>
          </input>
          <input
            className="auth-input"
            type="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.updateInput('password')}>
          </input>
          <button className="auth-button">{buttonName}</button>
        </form>
    );
  }
}

export default Form;
