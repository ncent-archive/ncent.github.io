import { connect } from 'react-redux';

import Tutors from '../components/Tutors/Tutors';

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

export default connect(mapStateToProps, mapDispatchToProps)(Tutors);
