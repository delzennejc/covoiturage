import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import qs from 'query-string';

import * as actions from './redux/actions';
import SearchPage from '../common/SearchPage';
import SelectUser from '../common/SelectUser';

export class DefaultPage extends Component {
  static propTypes = {
    travels: PropTypes.object.isRequired,
    travelId: PropTypes.string.isRequired
    // actions: PropTypes.object.isRequired,
  };

  render() {
    return (
      <div className="travels-default-page">
        {this.props.travelId
          ? <SelectUser />
          : <SearchPage entities={this.props.travels.travels} isTravels />
        }
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  const searchValue = state.common.search.value.toLowerCase();
  const { id: travelId } = qs.parse(state.router.location.search);
  if (searchValue) {
    return {
      travelId,
      travels: {
        ...state.travels,
        travels: state.travels.travels
          .map(id => state.common.travels[id])
          .filter(tl => (
            tl.driver.firstName.toLowerCase().includes(searchValue) ||
            tl.driver.lastName.toLowerCase().includes(searchValue) ||
            tl.driver.postalCode.toLowerCase().includes(searchValue) ||
            tl.meetingPlace.toLowerCase().includes(searchValue) ||
            tl.destination.toLowerCase().includes(searchValue)
          ))
      },
    };
  }
  return {
    travelId,
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
