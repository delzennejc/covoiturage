import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { DefaultPage } from 'src/features/create-account/DefaultPage';

describe('create-account/DefaultPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      createAccount: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <DefaultPage {...props} />
    );

    expect(
      renderedComponent.find('.create-account-default-page').getElement()
    ).to.exist;
  });
});
