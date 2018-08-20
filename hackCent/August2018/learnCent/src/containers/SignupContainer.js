import { connect } from 'react-redux';
import Auth from '../components/Auth/Auth';

function mapStateToProps(state, ownProps) {
  return {
    formInfo: {
      buttonName: "Sign Up",
      altLink: "/login",
      altPText: "Already have an account?",
      altLinkText: "Log In!"
    },
    user: {
      username: '',
      password: '',
    },
    history: ownProps.history
    // map auth errors from redux state to display on form
  };
}

function mapDispatchToProps(dispatch) {
  return {
    // action: signup thunk
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
