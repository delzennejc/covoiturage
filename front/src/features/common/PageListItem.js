import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { GridListTile } from 'material-ui/GridList';
import Paper from 'material-ui/Paper';

export default class PageListItem extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired
  };

  render() {
    return (
      <GridListTile className="common-page-list-item">
        <Paper className="common-page-list-item-title" elevation={0}>
          <p>{this.props.name}</p>
        </Paper>
      </GridListTile>
    );
  }
}
