import { expect } from 'chai';

import {
  COMMON_SEARCH_ENTITY,
} from 'src/features/common/redux/constants';

import {
  searchEntity,
  reducer,
} from 'src/features/common/redux/searchEntity';

describe('common/redux/searchEntity', () => {
  it('returns correct action by searchEntity', () => {
    expect(searchEntity()).to.have.property('type', COMMON_SEARCH_ENTITY);
  });

  it('handles action type COMMON_SEARCH_ENTITY correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: COMMON_SEARCH_ENTITY }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state).to.deep.equal(prevState); // TODO: replace this line with real case.
  });
});
