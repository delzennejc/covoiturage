import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actions from './redux/actions';

class Search extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    value: PropTypes.string.isRequired,
  };

  render() {
    return (
      <div className="common-search">
        <TextField
          id="search"
          label="Recherche"
          placeholder="Nom, destination, code postal, etc..."
          margin="normal"
          value={this.props.value}
          onChange={e => this.props.actions.searchEntity(e.target.value)}
          fullWidth
        />
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    value: state.common.search.value
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
)(Search);
