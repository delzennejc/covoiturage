import React, { Component } from 'react';
import { InputLabel } from 'material-ui/Input';
import PropTypes from 'prop-types';
import Radio from 'material-ui/Radio';

export default class SearchRadio extends Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  };

  render() {
    return (
      <div className="common-search-radio-labels">
        <InputLabel>{this.props.label}</InputLabel>
        <Radio
          /* checked={this.state.selectedValue === 'a'}
          onChange={this.handleChange} */
          value={this.props.value}
          name={this.props.name}
        />
      </div>
    );
  }
}
