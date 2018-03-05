import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { SearchRadioGroup } from 'src/features/common';

describe('common/SearchRadioGroup', () => {
  it('renders node with correct class name', () => {
    const renderedComponent = shallow(
      <SearchRadioGroup />
    );

    expect(
      renderedComponent.find('.common-search-radio-group').getElement()
    ).to.exist;
  });
});
