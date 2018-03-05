import React, { Component } from 'react';
import GridList from 'material-ui/GridList';
import PageListItem from '../common/PageListItem';

export default class PageList extends Component {
  render() {
    return (
      <div className="common-page-list">
        <GridList className="common-page-list-list" cols={4} cellHeight={130}>
          <PageListItem name="Jean-Claude Pratt-Delzenne" />
          <PageListItem name="Jean-Claude Pratt-Delzenne" />
          <PageListItem name="Jean-Claude Pratt-Delzenne" />
          <PageListItem name="Jean-Claude Pratt-Delzenne" />
          <PageListItem name="Jean-Claude Pratt-Delzenne" />
          <PageListItem name="Jean-Claude Pratt-Delzenne" />
          <PageListItem name="Jean-Claude Pratt-Delzenne" />
          <PageListItem name="Jean-Claude Pratt-Delzenne" />
          <PageListItem name="Jean-Claude Pratt-Delzenne" />
          <PageListItem name="Jean-Claude Pratt-Delzenne" />
          <PageListItem name="Jean-Claude Pratt-Delzenne" />
          <PageListItem name="Jean-Claude Pratt-Delzenne" />
        </GridList>
      </div>
    );
  }
}
