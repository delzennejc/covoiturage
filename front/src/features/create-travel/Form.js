import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Formsy from 'formsy-react';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import TextInput from '../common/TextInput';
import * as actions from './redux/actions';

export class Form extends Component {
  static propTypes = {
    createTravel: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.disableButton = this.disableButton.bind(this);
    this.enableButton = this.enableButton.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.submit = this.submit.bind(this);
    this.state = {};
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
    this.setState({ canSubmit: true });
  }

  submit(form) {
    const travel = form;
    travel.driver = {};
    travel.travelers = [];
    this.props.actions.createTravel(travel);
  }

  render() {
    return (
      <div className="create-travel-form">
        <Formsy onValidSubmit={this.submit} onValid={this.enableButton} onInvalid={this.disableButton} onChange={this.handleChange}>
          <Grid container spacing={24}>
            <Grid item xs={12} sm={6}>
              <TextInput
                id="meetingPlace"
                name="meetingPlace"
                label="Point de rencontre"
                value={this.state.meetingPlace}
                className="create-travel-textfield"
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextInput
                id="meetingSchedule"
                name="meetingSchedule"
                label="Horaire de rdv"
                value={this.state.meetingSchedule}
                className="create-travel-small-textfield "
                required
              />
            </Grid>
          </Grid>
          <Grid container spacing={24}>
            <Grid item xs={12} sm={6}>
              <TextInput
                id="destination"
                name="destination"
                label="Destination"
                value={this.state.destination}
                className="create-travel-textfield"
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextInput
                id="freeSeats"
                name="freeSeats"
                label="Places disponibles"
                value={this.state.freeSeats}
                className="create-travel-small-textfield "
                required
              />
            </Grid>
          </Grid>
          <Grid
            container
            spacing={24}
            alignItems="center"
            direction="row"
            justify="center"
            style={{ padding: 50 }}
          >
            <Button type="submit" variant="raised" size="large" color="primary" disabled={!this.state.canSubmit}>
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
    createTravel: state.createTravel,
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
)(Form);
