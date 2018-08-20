import { connect } from 'react-redux';

import Students from '../components/Students/Students';

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

export default connect(mapStateToProps, mapDispatchToProps)(Students);
