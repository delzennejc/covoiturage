import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { ShowUser } from 'src/features/common';

describe('common/ShowUser', () => {
  it('renders node with correct class name', () => {
    const renderedComponent = shallow(
      <ShowUser />
    );

    expect(
      renderedComponent.find('.common-show-user').getElement()
    ).to.exist;
  });
});
