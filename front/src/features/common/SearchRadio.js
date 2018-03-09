import React, { Component } from 'react';
import { InputLabel } from 'material-ui/Input';
import PropTypes from 'prop-types';
import Radio from 'material-ui/Radio';

export default class SearchRadio extends Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    checked: PropTypes.bool.isRequired,
    onChange: PropTypes.func,
    onClick: PropTypes.func,
  };

  static defaultProps = {
    onChange: null,
    onClick: null
  }

  render() {
    return (
      <div className="common-search-radio-labels">
        <InputLabel>{this.props.label}</InputLabel>
        <Radio
          onChange={this.props.onChange}
          onClick={this.props.onClick}
          checked={this.props.checked}
          value={this.props.value}
          name={this.props.name}
        />
      </div>
    );
  }
}
