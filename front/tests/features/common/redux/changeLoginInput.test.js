import { expect } from 'chai';

import {
  COMMON_CHANGE_LOGIN_INPUT,
} from 'src/features/common/redux/constants';

import {
  changeLoginInput,
  reducer,
} from 'src/features/common/redux/changeLoginInput';

describe('common/redux/changeLoginInput', () => {
  it('returns correct action by changeLoginInput', () => {
    expect(changeLoginInput()).to.have.property('type', COMMON_CHANGE_LOGIN_INPUT);
  });

  it('handles action type COMMON_CHANGE_LOGIN_INPUT correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: COMMON_CHANGE_LOGIN_INPUT }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state).to.deep.equal(prevState); // TODO: replace this line with real case.
  });
});
