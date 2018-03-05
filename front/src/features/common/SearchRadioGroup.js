import React, { Component } from 'react';
import SearchRadio from '../common/SearchRadio';

export default class SearchRadioGroup extends Component {
  static propTypes = {};

  render() {
    return (
      <div className="common-search-radio-labels-group">
        <SearchRadio
          label="Conducteur"
          name="driver"
          value="driver"
        />
        <SearchRadio
          label="Voyageur"
          name="traveler"
          value="traveler"
        />
        <SearchRadio
          label="Conducteur"
          name="travel"
          value="travel"
        />
      </div>
    );
  }
}
