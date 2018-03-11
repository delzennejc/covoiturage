import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';

import SearchPage from '../common/SearchPage';

export class DefaultPage extends Component {
  static propTypes = {
    drivers: PropTypes.object.isRequired,
    // actions: PropTypes.object.isRequired,
  };

  render() {
    return (
      <div className="drivers-default-page">
        <SearchPage entities={this.props.drivers.drivers} />
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  const searchValue = state.common.search.value.toLowerCase();
  if (searchValue) {
    return {
      drivers: {
        ...state.drivers,
        drivers: state.drivers.drivers
          .map(id => state.common.users[id])
          .filter(dv => (
            dv.firstName.toLowerCase().includes(searchValue) ||
            dv.lastName.toLowerCase().includes(searchValue) ||
            dv.postalCode.toLowerCase().includes(searchValue) ||
            dv.meetingPlace.toLowerCase().includes(searchValue)
          ))
      },
    };
  }
  return {
    drivers: {
      ...state.drivers,
      drivers: state.drivers.drivers.map(id => state.common.users[id])
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
