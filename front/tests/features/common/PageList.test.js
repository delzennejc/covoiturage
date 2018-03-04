import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { PageList } from 'src/features/common';

describe('common/PageList', () => {
  it('renders node with correct class name', () => {
    const renderedComponent = shallow(
      <PageList />
    );

    expect(
      renderedComponent.find('.common-page-list').getElement()
    ).to.exist;
  });
});
