import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';

import SearchPage from '../common/SearchPage';

export class DefaultPage extends Component {
  static propTypes = {
    travels: PropTypes.object.isRequired,
    // actions: PropTypes.object.isRequired,
  };

  render() {
    return (
      <div className="travels-default-page">
        <SearchPage entities={this.props.travels.travels} isTravels />
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    travels: {
      ...state.travels,
      travels: state.travels.travels.map(id => state.common.travels[id])
    },
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DefaultPage);
