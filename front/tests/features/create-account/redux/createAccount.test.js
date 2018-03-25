import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { expect } from 'chai';

import {
  CREATE_ACCOUNT_CREATE_ACCOUNT_BEGIN,
  CREATE_ACCOUNT_CREATE_ACCOUNT_SUCCESS,
  CREATE_ACCOUNT_CREATE_ACCOUNT_FAILURE,
  CREATE_ACCOUNT_CREATE_ACCOUNT_DISMISS_ERROR,
} from 'src/features/create-account/redux/constants';

import {
  createAccount,
  dismissCreateAccountError,
  reducer,
} from 'src/features/create-account/redux/createAccount';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('create-account/redux/createAccount', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when createAccount succeeds', () => {
    const store = mockStore({});

    return store.dispatch(createAccount())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', CREATE_ACCOUNT_CREATE_ACCOUNT_BEGIN);
        expect(actions[1]).to.have.property('type', CREATE_ACCOUNT_CREATE_ACCOUNT_SUCCESS);
      });
  });

  it('dispatches failure action when createAccount fails', () => {
    const store = mockStore({});

    return store.dispatch(createAccount({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', CREATE_ACCOUNT_CREATE_ACCOUNT_BEGIN);
        expect(actions[1]).to.have.property('type', CREATE_ACCOUNT_CREATE_ACCOUNT_FAILURE);
        expect(actions[1]).to.have.nested.property('data.error').that.exist;
      });
  });

  it('returns correct action by dismissCreateAccountError', () => {
    const expectedAction = {
      type: CREATE_ACCOUNT_CREATE_ACCOUNT_DISMISS_ERROR,
    };
    expect(dismissCreateAccountError()).to.deep.equal(expectedAction);
  });

  it('handles action type CREATE_ACCOUNT_CREATE_ACCOUNT_BEGIN correctly', () => {
    const prevState = { createAccountPending: false };
    const state = reducer(
      prevState,
      { type: CREATE_ACCOUNT_CREATE_ACCOUNT_BEGIN }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.createAccountPending).to.be.true;
  });

  it('handles action type CREATE_ACCOUNT_CREATE_ACCOUNT_SUCCESS correctly', () => {
    const prevState = { createAccountPending: true };
    const state = reducer(
      prevState,
      { type: CREATE_ACCOUNT_CREATE_ACCOUNT_SUCCESS, data: {} }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.createAccountPending).to.be.false;
  });

  it('handles action type CREATE_ACCOUNT_CREATE_ACCOUNT_FAILURE correctly', () => {
    const prevState = { createAccountPending: true };
    const state = reducer(
      prevState,
      { type: CREATE_ACCOUNT_CREATE_ACCOUNT_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.createAccountPending).to.be.false;
    expect(state.createAccountError).to.exist;
  });

  it('handles action type CREATE_ACCOUNT_CREATE_ACCOUNT_DISMISS_ERROR correctly', () => {
    const prevState = { createAccountError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: CREATE_ACCOUNT_CREATE_ACCOUNT_DISMISS_ERROR }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.createAccountError).to.be.null;
  });
});
