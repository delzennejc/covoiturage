import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Formsy from 'formsy-react';
import Checkbox from 'material-ui/Checkbox';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import Radio, { RadioGroup } from 'material-ui/Radio';
import Select from 'material-ui/Select';
import { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl, FormControlLabel } from 'material-ui/Form';

import * as actions from './redux/actions';
import TextInput from '../common/TextInput';


export class CreateForm extends Component {
  static propTypes = {
    createAccount: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };
  constructor(props) {
    super(props);
    this.disableButton = this.disableButton.bind(this);
    this.enableButton = this.enableButton.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = { canSubmit: false, driverLicense: '' };
  }

  handleChange(event) {
    if (event.target) {
      this.setState({ [event.target.name]: event.target.value });
    } else {
      this.setState(event);
    }
  }

  disableButton() {
    this.setState({ canSubmit: false });
  }

  enableButton() {
    this.setState({ canSubmit: (this.state.userType !== undefined) });
  }

  submit(form) {
    console.log('submitted : ', form);
  }

  render() {
    console.log('state : ', this.state);
    return (
      <div className="create-account-create-form">
        <Formsy onValidSubmit={this.submit} onValid={this.enableButton} onInvalid={this.disableButton} onChange={this.handleChange}>
          <Grid
            container
            spacing={24}
            alignItems="center"
            direction="row"
            justify="center">
            <RadioGroup
              aria-label="userType"
              name="userType"
              value={this.state.userType}
              onChange={this.handleChange}
              style={{ flexDirection: 'row' }}
            >
              <FormControlLabel value="driver" control={<Radio />} label="Conducteur" />
              <FormControlLabel value="traveler" control={<Radio />} label="Voyageur" />
            </RadioGroup>
          </Grid>
          <Grid container spacing={24}>
            <Grid item xs={12} sm={6}>
              <TextInput
                id="firstname"
                name="firstname"
                label="Prénom"
                value={this.state.firstname}
                className="create-account-textfield"
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextInput
                id="lastname"
                name="lastname"
                label="Nom"
                value={this.state.lastname}
                className="create-account-textfield"
                required
              />
            </Grid>
          </Grid>
          <Grid container spacing={24}>
            <Grid item xs={12} sm={6}>
              <TextInput
                id="email"
                name="email"
                label="Email"
                value={this.state.email}
                className="create-account-textfield"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextInput
                id="phone"
                name="phone"
                label="Numéro de téléphone"
                value={this.state.phone}
                className="create-account-textfield"
                required
              />
            </Grid>
          </Grid>
          <Grid container spacing={24}>
            <Grid item xs={12} sm={6}>
              <TextInput
                id="password"
                name="password"
                label="Mot de passe"
                type="password"
                value={this.state.password}
                className="create-account-textfield"
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextInput
                id="confirmation"
                name="confirmation"
                label="Confirmation mot de passe"
                type="password"
                value={this.state.confirmation}
                className="create-account-textfield"
                required
              />
            </Grid>
          </Grid>
          <Grid container spacing={24}>
            <Grid item xs={12} sm={6}>
              <TextInput
                id="postalCode"
                name="postalCode"
                label="Code postal"
                value={this.state.postalCode}
                className="create-account-textfield"
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextInput
                id="railsStation"
                name="railsStation"
                label="Métro / RER"
                value={this.state.railsStation}
                className="create-account-textfield"
              />
            </Grid>
          </Grid>
          <Grid container spacing={24}>
            <Grid item xs={12} sm={6}>
              <TextInput
                id="meetingPlace"
                name="meetingPlace"
                label="Lieu de rencontre"
                value={this.state.meetingPlace}
                className="create-account-textfield"
              />
            </Grid>
            <Grid item xs={6} sm={3}>
              <TextInput
                id="bloc"
                name="bloc"
                label="Bloc"
                type="number"
                value={this.state.bloc}
                InputLabelProps={{
                  shrink: true,
                }}
                className="create-account-textfield"
                required
              />
            </Grid>
            <Grid item xs={6} sm={3}>
              <TextInput
                id="sector"
                name="sector"
                label="Secteur"
                type="number"
                value={this.state.sector}
                InputLabelProps={{
                  shrink: true,
                }}
                className="create-account-textfield"
                required
              />
            </Grid>
          </Grid>
          {(this.state.userType === 'driver') &&
            <Grid container spacing={24}>
              <Grid item xs={12} sm={6}>
                <FormControl className="create-account-small-textfield">
                  <InputLabel htmlFor="driverLicense">Type de permis</InputLabel>
                  <Select
                    value={this.state.driverLicense}
                    inputProps={{
                      name: 'driverLicense',
                      id: 'driverLicense',
                    }}
                    onChange={this.handleChange}
                  >
                    <MenuItem value="">Type de permis</MenuItem>
                    <MenuItem value="B">Permis B</MenuItem>
                    <MenuItem value="B1">Permis B1</MenuItem>
                    <MenuItem value="C1">Permis C1</MenuItem>
                    <MenuItem value="D1">Permis D1</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextInput
                  id="seats"
                  name="seats"
                  label="Nombre de sièges"
                  type="number"
                  value={this.state.seats}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  className="create-account-small-textfield"
                />
              </Grid>
            </Grid>
          }
          <Grid
            container
            spacing={24}
            alignItems="center"
            direction="row"
            justify="center"
            style={{ padding: 50 }}>
            <Button variant="raised" size="large" color="primary" disabled={!this.state.canSubmit}>
              Enregistrer
            </Button>
          </Grid>
        </Formsy>
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    createAccount: state.createAccount,
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
)(CreateForm);
