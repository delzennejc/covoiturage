import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { DefaultPage } from 'src/features/travel/DefaultPage';

describe('travel/DefaultPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      travel: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <DefaultPage {...props} />
    );

    expect(
      renderedComponent.find('.travel-default-page').getElement()
    ).to.exist;
  });
});
