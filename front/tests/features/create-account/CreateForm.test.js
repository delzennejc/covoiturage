import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { CreateForm } from 'src/features/create-account/CreateForm';

describe('create-account/CreateForm', () => {
  it('renders node with correct class name', () => {
    const props = {
      createAccount: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <CreateForm {...props} />
    );

    expect(
      renderedComponent.find('.create-account-create-form').getElement()
    ).to.exist;
  });
});
