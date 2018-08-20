import { connect } from 'react-redux';
import Auth from '../components/Auth/Auth';

function mapStateToProps(state, ownProps) {
  return {
    formInfo: {
      buttonName: "Log In",
      altLink: "/signup",
      altPText: "No account?",
      altLinkText: "Sign Up!"
    },
    user: {
      username: '',
      password: '',
    },
    history: ownProps.history
    // map login errors from redux state to display on form
  };
}

function mapDispatchToProps(dispatch) {
  return {
    // action: login thunk
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
