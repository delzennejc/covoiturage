import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import List, {
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
} from 'material-ui/List';

export default class ShowUser extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
  };

  render() {
    return (
      <div className="users-show-user">
        <Typography variant="title" className="user-title">{this.props.title}: {this.props.user.firstName}</Typography>
        <List className="users-show-list">
          <ListItem dense>
            <ListItemText primary="Prénom" />
            <ListItemText className="list-text-second" primary={this.props.user.firstName} />
          </ListItem>
          <Divider />
          <ListItem dense>
            <ListItemText primary="Nom" />
            <ListItemText className="list-text-second" primary={this.props.user.lastName} />
          </ListItem>
          <Divider />
          <ListItem dense>
            <ListItemText primary="Téléphone" />
            <ListItemText className="list-text-second" primary={this.props.user.phone} />
          </ListItem>
          <Divider />
          <ListItem dense>
            <ListItemText primary="Email" />
            <ListItemText className="list-text-second" primary={this.props.user.email} />
          </ListItem>
          <Divider />
          <ListItem dense>
            <ListItemText primary="Code Postal" />
            <ListItemText className="list-text-second" primary={this.props.user.postalCode} />
          </ListItem>
          <Divider />
          <ListItem dense>
            <ListItemText primary="Station de Métro/RER" />
            <ListItemText className="list-text-second" primary={this.props.user.railsStation} />
          </ListItem>
          <Divider />
          <ListItem dense>
            <ListItemText primary="Lieu de rendez-vous" />
            <ListItemText className="list-text-second" primary={this.props.user.meetingPlace} />
          </ListItem>
          <Divider />
          <ListItem dense>
            <ListItemText primary="Secteur" />
            <ListItemText className="list-text-second" primary={this.props.user.sector} />
          </ListItem>
          <Divider />
          <ListItem dense>
            <ListItemText primary="Bloc" />
            <ListItemText className="list-text-second" primary={this.props.user.bloc} />
          </ListItem>
          {this.props.user.role.includes('driver') &&
          <Fragment>
            <Divider />
            <ListItem dense>
                <ListItemText primary="Places" />
                <ListItemText className="list-text-second" primary={this.props.user.seats} />
            </ListItem>
            <Divider />
            <ListItem dense>
                <ListItemText primary="Permis" />
                <ListItemText className="list-text-second" primary={this.props.user.driverLicense.join(',')} />
            </ListItem>
            <Divider />
            <ListItem dense>
                <ListItemText primary="Fimo" />
                <ListItemText className="list-text-second" primary={this.props.user.fimo ? 'Oui' : 'Non'} />
            </ListItem>
          </Fragment>}
        </List>
      </div>
    );
  }
}
