import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { Login } from 'src/features/common';

describe('common/Login', () => {
  it('renders node with correct class name', () => {
    const renderedComponent = shallow(
      <Login />
    );

    expect(
      renderedComponent.find('.common-login').getElement()
    ).to.exist;
  });
});
