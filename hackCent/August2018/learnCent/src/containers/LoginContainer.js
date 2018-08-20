import { connect } from 'react-redux';
import Auth from '../components/Auth/Auth';
import { loginUser } from '../actions/user_actions';

function mapStateToProps(state, ownProps) {
  return {
    formInfo: {
      buttonName: "Log In",
      altLink: "/signup",
      altPText: "No account?",
      altLinkText: "Sign Up!"
    },
    user: {
      email: '',
      password: '',
    },
    history: ownProps.history,
    errors: state.errors
  };
}

function mapDispatchToProps(dispatch) {
  return {
    action: (user) => dispatch(loginUser(user))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
