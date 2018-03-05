import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { PageListItem } from 'src/features/common';

describe('common/PageListItem', () => {
  it('renders node with correct class name', () => {
    const renderedComponent = shallow(
      <PageListItem />
    );

    expect(
      renderedComponent.find('.common-page-list-item').getElement()
    ).to.exist;
  });
});
