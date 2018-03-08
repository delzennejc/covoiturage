import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';

export default class Login extends Component {
  static propTypes = {
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
  };

  render() {
    return (
      <div className="common-login">
        <form className="common-login-form">
          <Paper className="common-login-container">
            <Typography color="textSecondary" className="common-login-title" variant="title" align="center">
              Login
            </Typography>
            <TextField
              className="common-login-email"
              name="email"
              placeholder="Email"
              value={this.props.email}
              onChange={this.props.onChange}
              fullWidth
            />
            <TextField
              className="common-login-password"
              type="password"
              name="password"
              placeholder="Mot de passe"
              value={this.props.password}
              onChange={this.props.onChange}
              fullWidth
            />
            <Button variant="raised" color="primary" onClick={this.props.onSubmit}>Se connecter</Button>
          </Paper>
        </form>
      </div>
    );
  }
}
