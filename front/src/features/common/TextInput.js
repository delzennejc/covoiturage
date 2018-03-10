import React, { Component } from 'react';
import { withFormsy } from 'formsy-react';
import TextField from 'material-ui/TextField';

class TextInput extends Component {
  static propTypes = {
  };

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
      <div>
        <TextField
          id={this.props.id}
          name={this.props.name}
          label={this.props.label}
          type={this.props.type}
          className={this.props.className}
          onChange={this.changeValue}
          value={this.props.getValue() || ''}
        />
        <span>{errorMessage}</span>
      </div>
    );
  }
}

export default withFormsy(TextInput);