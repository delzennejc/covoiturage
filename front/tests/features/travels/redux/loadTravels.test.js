import { expect } from 'chai';

import {
  TRAVELS_LOAD_TRAVELS,
} from 'src/features/travels/redux/constants';

import {
  loadTravels,
  reducer,
} from 'src/features/travels/redux/loadTravels';

describe('travels/redux/loadTravels', () => {
  it('returns correct action by loadTravels', () => {
    expect(loadTravels()).to.have.property('type', TRAVELS_LOAD_TRAVELS);
  });

  it('handles action type TRAVEL_LOAD_TRAVELS correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: TRAVELS_LOAD_TRAVELS }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state).to.deep.equal(prevState); // TODO: replace this line with real case.
  });
});
