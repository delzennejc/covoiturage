import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';

import PageList from '../common/PageList';
import Search from '../common/Search';
import SearchRadioGroup from '../common/SearchRadioGroup';

export class DefaultPage extends Component {
  static propTypes = {
    travelers: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  render() {
    return (
      <div className="travelers-default-page">
        <div className="travelers-container-top">
          <Search />
          <SearchRadioGroup />
        </div>
        <PageList />
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    travelers: state.travelers,
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
