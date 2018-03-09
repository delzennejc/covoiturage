import React, { Component } from 'react';
import PropTypes from 'prop-types';

import PageList from '../common/PageList';
import Search from '../common/Search';
import SearchRadioGroup from '../common/SearchRadioGroup';

export default class SearchPage extends Component {
  static propTypes = {
    entities: PropTypes.array.isRequired,
    isTravels: PropTypes.bool,
  };

  static defaultProps = {
    isTravels: false
  }

  render() {
    return (
      <div className="common-search-page">
        <div className="common-container-top">
          <Search />
          <SearchRadioGroup />
        </div>
        <PageList list={this.props.entities} isTravels={this.props.isTravels} />
      </div>
    );
  }
}
