import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { TextInput } from 'src/features/common';

describe('common/TextInput', () => {
  it('renders node with correct class name', () => {
    const renderedComponent = shallow(
      <TextInput />
    );

    expect(
      renderedComponent.find('.common-text-input').getElement()
    ).to.exist;
  });
});
