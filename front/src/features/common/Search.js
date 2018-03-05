import React, { Component } from 'react';
import TextField from 'material-ui/TextField';

export default class Search extends Component {
  static propTypes = {};

  render() {
    return (
      <div className="common-search">
        <TextField
          id="search"
          label="Recherche"
          margin="normal"
          fullWidth
          {...this.props}
        />
      </div>
    );
  }
}
