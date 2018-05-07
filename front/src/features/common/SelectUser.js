import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import ExpansionPanel, {
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from 'material-ui/ExpansionPanel';
import Typography from 'material-ui/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import Delete from '@material-ui/icons/Delete';
import List, { ListItem, ListItemText, ListItemSecondaryAction } from 'material-ui/List';

import { Combobox } from 'react-input-enhancements';

import * as actions from './redux/actions';

class SelectUser extends Component {
  static propTypes = {
    common: PropTypes.object.isRequired,
    drivers: PropTypes.array.isRequired,
    travelers: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired,
    userCategory: PropTypes.string,
  };

  static defaultProps = {
    userCategory: 'drivers'
  }

  constructor(props) {
    super(props);
    this.state = {
      selected: []
    };
  }



  render() {
    return (
      <div className="common-select-user">
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>{this.props.userCategory === 'travelers' ? 'Voyageur' : 'Conducteur'}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Combobox
              options={this.props[this.props.userCategory]}
              dropdownProps={{ style: { width: '100%', position: 'relative' } }}
              autocomplete
              onSelect={(val) => {
                this.setState({ selected: [...this.state.selected.filter(l => l._id !== val._id), val] });
              }}
            >
              {(inputProps, { matchingText, width }) => (
                <TextField
                  id="search"
                  label={`Rechercher ${this.props.userCategory === 'travelers' ? 'Voyageur' : 'Conducteur'}`}
                  type="search"
                  margin="normal"
                  fullWidth
                  {...inputProps}
                />
              )
              }
            </Combobox>
            <List className="select-user-selected-items">
              {this.state.selected.map((val) => (
                [<ListItem>
                  <ListItemText>{val.label}</ListItemText>
                  <ListItemSecondaryAction>
                    <Delete 
                      className="select-user-delete-button"
                      onClick={() => this.setState({ selected: this.state.selected.filter(l => l._id !== val._id) })}
                    />
                  </ListItemSecondaryAction>
                </ListItem>,
                <Divider />]
              ))}
            </List>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    common: state.common,
    travelers: state.travelers.travelers.map(id => ({
      ...state.common.users[id],
      label: `${state.common.users[id].firstName} ${state.common.users[id].lastName}`,
      text: `${state.common.users[id].firstName} ${state.common.users[id].lastName}`,
      value: { ...state.common.users[id], label: `${state.common.users[id].firstName} ${state.common.users[id].lastName}` }
    })),
    drivers: state.drivers.drivers.map(id => ({
      ...state.common.users[id],
      label: `${state.common.users[id].firstName} ${state.common.users[id].lastName}`,
      text: `${state.common.users[id].firstName} ${state.common.users[id].lastName}`,
      value: { ...state.common.users[id], label: `${state.common.users[id].firstName} ${state.common.users[id].lastName}` }
    })),
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
)(SelectUser);
