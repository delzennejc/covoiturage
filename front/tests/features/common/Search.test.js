import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { Search } from 'src/features/common';

describe('common/Search', () => {
  it('renders node with correct class name', () => {
    const renderedComponent = shallow(
      <Search />
    );

    expect(
      renderedComponent.find('.common-search').getElement()
    ).to.exist;
  });
});
