import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

/* import Grid from 'material-ui/Grid';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu'; */

import * as actions from './redux/actions';
import * as commonActions from '../common/redux/actions';
import Login from '../common/Login';

export class DefaultPage extends Component {
  static propTypes = {
    home: PropTypes.object.isRequired,
    common: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(state, ctx) {
    super(state, ctx);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.actions.login();
  }

  onChange(e) {
    this.props.actions.changeLoginInput(e.target.name, e.target.value);
  }

  render() {
    return (
      <div className="home-default-page">
        {!this.props.common.token &&
        <Login
          email={this.props.common.userInfos.email}
          password={this.props.common.userInfos.password}
          onSubmit={this.onSubmit}
          onChange={this.onChange}
        />}
        {this.props.common.token && <p>...</p>}
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    home: state.home,
    common: state.common,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions, ...commonActions }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DefaultPage);
