import { connect } from 'react-redux';
import { fetchTokenCount } from '../actions/token_actions';
import Tutors from '../components/Tutors/Tutors';

function mapStateToProps(state) {
  return {
    tokenCount: state.tokens.tokenCount
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchTokenCount: () => dispatch(fetchTokenCount())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Tutors);
