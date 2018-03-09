import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import SearchRadio from '../common/SearchRadio';

class SearchRadioGroup extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
  };

  render() {
    return (
      <div className="common-search-radio-labels-group">
        <SearchRadio
          label="Conducteur"
          name="driver"
          value="driver"
          checked={this.props.location.pathname === '/drivers'}
          onClick={() => this.props.history.push('/drivers')}
        />
        <SearchRadio
          label="Voyageur"
          name="traveler"
          value="traveler"
          checked={this.props.location.pathname === '/travelers'}
          onClick={() => this.props.history.push('/travelers')}
        />
        <SearchRadio
          label="Voyages"
          name="travel"
          value="travel"
          checked={this.props.location.pathname === '/travels'}
          onClick={() => this.props.history.push('/travels')}
        />
      </div>
    );
  }
}

export default withRouter(SearchRadioGroup);
