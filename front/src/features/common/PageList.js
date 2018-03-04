import React, { Component } from 'react';
import GridList, { GridListTile } from 'material-ui/GridList';
import Paper from 'material-ui/Paper';

export default class PageList extends Component {
  render() {
    return (
      <div className="common-page-list">
        <GridList className="common-page-list-list" cols={3}>
          <GridListTile className="common-page-list-item">
            <Paper className="common-page-list-item-title" elevation={4}>FirstName LastName</Paper>
          </GridListTile>
          <GridListTile className="common-page-list-item">
            <Paper className="common-page-list-item-title">FirstName LastName</Paper>
          </GridListTile>
          <GridListTile className="common-page-list-item">
            <Paper className="common-page-list-item-title">FirstName LastName</Paper>
          </GridListTile>
        </GridList>
      </div>
    );
  }
}
