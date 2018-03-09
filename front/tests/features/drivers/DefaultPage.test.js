import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { DefaultPage } from 'src/features/drivers/DefaultPage';

describe('drivers/DefaultPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      drivers: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <DefaultPage {...props} />
    );

    expect(
      renderedComponent.find('.drivers-default-page').getElement()
    ).to.exist;
  });
});
