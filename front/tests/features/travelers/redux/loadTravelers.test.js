import { expect } from 'chai';

import {
  TRAVELERS_LOAD_TRAVELERS,
} from 'src/features/travelers/redux/constants';

import {
  loadTravelers,
  reducer,
} from 'src/features/travelers/redux/loadTravelers';

describe('travelers/redux/loadTravelers', () => {
  it('returns correct action by loadTravelers', () => {
    expect(loadTravelers()).to.have.property('type', TRAVELERS_LOAD_TRAVELERS);
  });

  it('handles action type TRAVELERS_LOAD_TRAVELERS correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: TRAVELERS_LOAD_TRAVELERS }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state).to.deep.equal(prevState); // TODO: replace this line with real case.
  });
});
