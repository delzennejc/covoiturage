import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';

import Formsy from 'formsy-react';
import Checkbox from 'material-ui/Checkbox';
import Grid from 'material-ui/Grid';
import Radio, { RadioGroup } from 'material-ui/Radio';
import TextField from 'material-ui/TextField';


export class CreateForm extends Component {
    static propTypes = {
        createAccount: PropTypes.object.isRequired,
        actions: PropTypes.object.isRequired,
    };
    constructor(props) {
        super(props);
        this.disableButton = this.disableButton.bind(this);
        this.enableButton = this.enableButton.bind(this);
        this.state = { canSubmit: false };
    }
    
    disableButton() {
        this.setState({ canSubmit: false });
    }

    enableButton() {
        this.setState({ canSubmit: true });
    }

    submit(model) {
        console.log("submitted : ", model)
    }

    render() {
        return (
        <div className="create-account-create-form">
                <Formsy onValidSubmit={this.submit} onValid={this.enableButton} onInvalid={this.disableButton}>
                  <Grid 
                    container 
                    spacing={24}
                    alignItems="center"
                    direction="row"
                    justify="center">
                      <label><Radio
                        checked={this.state.userType === 'driver'}
                        value="driver"
                        name="radio-button-usertype"
                        aria-label="Conducteur"
                      /> Conducteur </label>
                      <label><Radio
                        checked={this.state.userType === 'traveler'}
                        value="traveler"
                        name="radio-button-usertype"
                        aria-label="Traveler"
                      /> Voyageur </label>
                  </Grid>
                  <Grid container spacing={24}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                          id="firstname"
                          label="Prénom"
                          value={this.state.firstname}
                          className="create-account-textfield"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                          id="lastname"
                          label="Nom"
                          value={this.state.lastname}
                          className="create-account-textfield"
                        />
                    </Grid>
                  </Grid>
                  <Grid container spacing={24}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                          id="email"
                          label="Email"
                          value={this.state.email}
                          className="create-account-textfield"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                          id="phone"
                          label="Numéro de téléphone"
                          value={this.state.phone}
                          className="create-account-textfield"
                        />
                    </Grid>
                  </Grid>
                  <Grid container spacing={24}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                          id="password"
                          label="Mot de passe"
                          value={this.state.password}
                          className="create-account-textfield"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                          id="confirmation"
                          label="Confirmation mot de passe"
                          value={this.state.confirmation}
                          className="create-account-textfield"
                        />
                    </Grid>
                  </Grid>
                  <Grid container spacing={24}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                          id="postalCode"
                          label="Code postal"
                          value={this.state.postalCode}
                          className="create-account-textfield"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                          id="railsStation"
                          label="Métro / RER"
                          value={this.state.railsStation}
                          className="create-account-textfield"
                        />
                    </Grid>
                  </Grid>
                  <Grid container spacing={24}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                          id="meetingPlace"
                          label="Lieu de rencontre"
                          value={this.state.meetingPlace}
                          className="create-account-textfield"
                        />
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <TextField
                          id="bloc"
                          label="Bloc"
                          value={this.state.bloc}
                          className="create-account-small-textfield"
                        />
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <TextField
                          id="sector"
                          label="Secteur"
                          value={this.state.sector}
                          className="create-account-small-textfield"
                        />
                    </Grid>
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
