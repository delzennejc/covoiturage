import { expect } from 'chai';

import {
  DRIVERS_LOAD_DRIVERS,
} from 'src/features/drivers/redux/constants';

import {
  loadDrivers,
  reducer,
} from 'src/features/drivers/redux/loadDrivers';

describe('drivers/redux/loadDrivers', () => {
  it('returns correct action by loadDrivers', () => {
    expect(loadDrivers()).to.have.property('type', DRIVERS_LOAD_DRIVERS);
  });

  it('handles action type DRIVERS_LOAD_DRIVERS correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: DRIVERS_LOAD_DRIVERS }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state).to.deep.equal(prevState); // TODO: replace this line with real case.
  });
});
