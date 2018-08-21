import { connect } from 'react-redux';
import Auth from '../components/Auth/Auth';
import { createUser } from '../actions/user_actions';

function mapStateToProps(state, ownProps) {
  return {
    formInfo: {
      buttonName: "Sign Up",
      altLink: "/login",
      altPText: "Already have an account?",
      altLinkText: "Log In!"
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
    action: (user) => dispatch(createUser(user))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
