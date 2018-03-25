import { expect } from 'chai';

import {
  COMMON_CREATE_ACCOUNT,
} from 'src/features/common/redux/constants';

import {
  createAccount,
  reducer,
} from 'src/features/common/redux/createAccount';

describe('common/redux/createAccount', () => {
  it('returns correct action by createAccount', () => {
    expect(createAccount()).to.have.property('type', COMMON_CREATE_ACCOUNT);
  });

  it('handles action type COMMON_CREATE_ACCOUNT correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: COMMON_CREATE_ACCOUNT }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state).to.deep.equal(prevState); // TODO: replace this line with real case.
  });
});
