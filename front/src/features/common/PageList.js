import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GridList from 'material-ui/GridList';
import PageListItem from '../common/PageListItem';

export default class PageList extends Component {
  static propTypes = {
    list: PropTypes.array.isRequired,
    isTravels: PropTypes.bool,
  }

  static defaultProps = {
    isTravels: false
  }

  constructor(props, context) {
    super(props, context);
    this.createName = this.createName.bind(this);
  }

  createName(e) {
    if (this.props.isTravels) return `${e.driver.firstName} ${e.driver.lastName}`;
    return `${e.firstName} ${e.lastName}`;
  }

  render() {
    return (
      <div className="common-page-list">
        <GridList className="common-page-list-list" cols={4} cellHeight={130}>
          {this.props.list.map(e => (
            <PageListItem key={e._id} name={this.createName(e)} />
          ))}
        </GridList>
      </div>
    );
  }
}
