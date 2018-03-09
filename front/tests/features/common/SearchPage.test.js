import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { SearchPage } from 'src/features/common';

describe('common/SearchPage', () => {
  it('renders node with correct class name', () => {
    const renderedComponent = shallow(
      <SearchPage />
    );

    expect(
      renderedComponent.find('.common-search-page').getElement()
    ).to.exist;
  });
});
