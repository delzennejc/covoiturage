import React, { Component } from 'react';
import { withFormsy } from 'formsy-react';
import PropTypes from 'prop-types';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';

class TextInput extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    type: PropTypes.string,
    className: PropTypes.string,

    setValue: PropTypes.func.isRequired,
    getValue: PropTypes.func.isRequired,
    getErrorMessage: PropTypes.func.isRequired,
  };

  static defaultProps = {
    type: 'text',
    className: ''
  }

  constructor(props) {
    super(props);
    this.changeValue = this.changeValue.bind(this);
  }
  changeValue(event) {
    // setValue() will set the value of the component, which in
    // turn will validate it and the rest of the form
    // Important: Don't skip this step. This pattern is required
    // for Formsy to work.
    this.props.setValue(event.currentTarget.value);
  }
  render() {
    // An error message is returned only if the component is invalid
    const errorMessage = this.props.getErrorMessage();
    return (
      <FormControl className={this.props.className}>
        <InputLabel htmlFor={this.props.id}>{this.props.label}</InputLabel>
        <Input
          id={this.props.id}
          name={this.props.name}
          type={this.props.type}
          onChange={this.changeValue}
          value={this.props.getValue() || ''}
          error={(errorMessage !== null)}
        />
        <FormHelperText className="common-text-input-error">{errorMessage}</FormHelperText>
      </FormControl>
    );
  }
}

export default withFormsy(TextInput);
