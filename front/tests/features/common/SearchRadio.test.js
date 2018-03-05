import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { SearchRadio } from 'src/features/common';

describe('common/SearchRadio', () => {
  it('renders node with correct class name', () => {
    const renderedComponent = shallow(
      <SearchRadio />
    );

    expect(
      renderedComponent.find('.common-search-radio').getElement()
    ).to.exist;
  });
});
