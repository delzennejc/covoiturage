import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { DefaultPage } from 'src/features/travelers/DefaultPage';

describe('travelers/DefaultPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      travelers: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <DefaultPage {...props} />
    );

    expect(
      renderedComponent.find('.travelers-default-page').getElement()
    ).to.exist;
  });
});
