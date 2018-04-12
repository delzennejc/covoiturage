import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import AppBar from 'material-ui/AppBar';
import Menu, { MenuItem } from 'material-ui/Menu';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';

import * as commonActions from '../common/redux/actions';
import history from '../../common/history';

/*
  This is the root component of your app. Here you define the overall layout
  and the container of the react router.
  You should adjust it according to the requirement of your app.
*/
class App extends Component {
  static propTypes = {
    children: PropTypes.node,
    common: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  static defaultProps = {
    children: '',
  };

  state = {
    auth: true,
    anchorEl: null,
  };
  componentWillMount() {
    // load the token from localstorage
    this.props.actions.loadFromToken();
  }

  handleChange = (event, checked) => {
    this.setState({ auth: checked });
  };

  handleMenu = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = (page) => {
    history.push(`/${page}`);
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div className="home-app">
        <AppBar position="static">
          <Toolbar>
            <IconButton
              aria-label="Menu" 
              aria-owns={open ? 'menu-appbar' : null}
              aria-haspopup="true"
              onClick={this.handleMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Typography className="home-default-name" variant="title" color="inherit">
              Covoiturage
            </Typography>
            {!this.props.common.userDetails &&
            <Button
              color="inherit"
              onClick={() => history.push('/login')}
            >
              Login
            </Button>}
            {this.props.common.userDetails && 
            <div>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                open={open}
                onClose={this.handleClose}
              >
                <MenuItem onClick={() => this.handleClose('create-travel')}>Ajouter un voyage</MenuItem>
                <MenuItem onClick={() => this.handleClose('create-account')}>Ajouter un utilisateur</MenuItem>
                <MenuItem onClick={() => this.handleClose('travels')}>Voyages</MenuItem>
                <MenuItem onClick={() => this.handleClose('drivers')}>Conducteur</MenuItem>
                <MenuItem onClick={() => this.handleClose('travelers')}>Voyageurs</MenuItem>
              </Menu>
              <Typography variant="body1" color="inherit">
                Bonjour, {this.props.common.userDetails.firstName}
              </Typography>
            </div>}
          </Toolbar>
        </AppBar>
        {this.props.children}
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
    actions: bindActionCreators({ ...commonActions }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
