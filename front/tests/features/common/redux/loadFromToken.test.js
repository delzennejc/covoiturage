import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { expect } from 'chai';

import {
  COMMON_LOAD_FROM_TOKEN_BEGIN,
  COMMON_LOAD_FROM_TOKEN_SUCCESS,
  COMMON_LOAD_FROM_TOKEN_FAILURE,
  COMMON_LOAD_FROM_TOKEN_DISMISS_ERROR,
} from 'src/features/common/redux/constants';

import {
  loadFromToken,
  dismissLoadFromTokenError,
  reducer,
} from 'src/features/common/redux/loadFromToken';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('common/redux/loadFromToken', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when loadFromToken succeeds', () => {
    const store = mockStore({});

    return store.dispatch(loadFromToken())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', COMMON_LOAD_FROM_TOKEN_BEGIN);
        expect(actions[1]).to.have.property('type', COMMON_LOAD_FROM_TOKEN_SUCCESS);
      });
  });

  it('dispatches failure action when loadFromToken fails', () => {
    const store = mockStore({});

    return store.dispatch(loadFromToken({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', COMMON_LOAD_FROM_TOKEN_BEGIN);
        expect(actions[1]).to.have.property('type', COMMON_LOAD_FROM_TOKEN_FAILURE);
        expect(actions[1]).to.have.nested.property('data.error').that.exist;
      });
  });

  it('returns correct action by dismissLoadFromTokenError', () => {
    const expectedAction = {
      type: COMMON_LOAD_FROM_TOKEN_DISMISS_ERROR,
    };
    expect(dismissLoadFromTokenError()).to.deep.equal(expectedAction);
  });

  it('handles action type COMMON_LOAD_FROM_TOKEN_BEGIN correctly', () => {
    const prevState = { loadFromTokenPending: false };
    const state = reducer(
      prevState,
      { type: COMMON_LOAD_FROM_TOKEN_BEGIN }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.loadFromTokenPending).to.be.true;
  });

  it('handles action type COMMON_LOAD_FROM_TOKEN_SUCCESS correctly', () => {
    const prevState = { loadFromTokenPending: true };
    const state = reducer(
      prevState,
      { type: COMMON_LOAD_FROM_TOKEN_SUCCESS, data: {} }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.loadFromTokenPending).to.be.false;
  });

  it('handles action type COMMON_LOAD_FROM_TOKEN_FAILURE correctly', () => {
    const prevState = { loadFromTokenPending: true };
    const state = reducer(
      prevState,
      { type: COMMON_LOAD_FROM_TOKEN_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.loadFromTokenPending).to.be.false;
    expect(state.loadFromTokenError).to.exist;
  });

  it('handles action type COMMON_LOAD_FROM_TOKEN_DISMISS_ERROR correctly', () => {
    const prevState = { loadFromTokenError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: COMMON_LOAD_FROM_TOKEN_DISMISS_ERROR }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.loadFromTokenError).to.be.null;
  });
});
