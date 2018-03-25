import React, { Component } from 'react';
import PropTypes from 'prop-types';
import qs from 'query-string';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';

import SearchPage from '../common/SearchPage';
import ShowUser from '../common/ShowUser';

export class DefaultPage extends Component {
  static propTypes = {
    drivers: PropTypes.object.isRequired,
    driver: PropTypes.object.isRequired,
    // actions: PropTypes.object.isRequired,
  };

  render() {
    return (
      <div className="drivers-default-page">
        {!this.props.driver
            ? <SearchPage entities={this.props.drivers.drivers} />
            : <ShowUser user={this.props.driver} title="Conducteur" />
        }
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  const searchValue = state.common.search.value.toLowerCase();
  const driverId = qs.parse(state.router.location.search);
  console.log('driver', state.common.users[driverId.id])
  if (searchValue) {
    return {
      driver: state.common.users[driverId.id],
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
    driver: state.common.users[driverId.id],
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
