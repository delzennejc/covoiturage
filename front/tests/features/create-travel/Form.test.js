import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { Form } from 'src/features/create-travel/Form';

describe('create-travel/Form', () => {
  it('renders node with correct class name', () => {
    const props = {
      createTravel: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Form {...props} />
    );

    expect(
      renderedComponent.find('.create-travel-form').getElement()
    ).to.exist;
  });
});
