import { connect } from 'react-redux';
import App from '../components/App/App';

function mapStateToProps(state) {
  return {
    // results: state.demo.results
  };
}

function mapDispatchToProps(dispatch) {
  return {
    // actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
