import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { GridListTile } from 'material-ui/GridList';
import Paper from 'material-ui/Paper';

export default class PageListItem extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    component: PropTypes.object.isRequired,
    to: PropTypes.string.isRequired,
  };

  static defaultProps = {
    onClick: () => ({})
  }

  render() {
    return (
      <GridListTile className="common-page-list-item">
        <Paper
          onClick={this.props.onClick}
          className="common-page-list-item-title"
          elevation={0}
          component={this.props.component}
          to={this.props.to}
        >
          <p>{this.props.name}</p>
        </Paper>
      </GridListTile>
    );
  }
}
