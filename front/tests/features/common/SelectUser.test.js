import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { SelectUser } from 'src/features/common/SelectUser';

describe('common/SelectUser', () => {
  it('renders node with correct class name', () => {
    const props = {
      common: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <SelectUser {...props} />
    );

    expect(
      renderedComponent.find('.common-select-user').getElement()
    ).to.exist;
  });
});
