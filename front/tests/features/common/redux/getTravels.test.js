import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { expect } from 'chai';

import {
  COMMON_GET_TRAVELS_BEGIN,
  COMMON_GET_TRAVELS_SUCCESS,
  COMMON_GET_TRAVELS_FAILURE,
  COMMON_GET_TRAVELS_DISMISS_ERROR,
} from 'src/features/common/redux/constants';

import {
  getTravels,
  dismissGetTravelsError,
  reducer,
} from 'src/features/common/redux/getTravels';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('common/redux/getTravels', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when getTravels succeeds', () => {
    const store = mockStore({});

    return store.dispatch(getTravels())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', COMMON_GET_TRAVELS_BEGIN);
        expect(actions[1]).to.have.property('type', COMMON_GET_TRAVELS_SUCCESS);
      });
  });

  it('dispatches failure action when getTravels fails', () => {
    const store = mockStore({});

    return store.dispatch(getTravels({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', COMMON_GET_TRAVELS_BEGIN);
        expect(actions[1]).to.have.property('type', COMMON_GET_TRAVELS_FAILURE);
        expect(actions[1]).to.have.nested.property('data.error').that.exist;
      });
  });

  it('returns correct action by dismissGetTravelsError', () => {
    const expectedAction = {
      type: COMMON_GET_TRAVELS_DISMISS_ERROR,
    };
    expect(dismissGetTravelsError()).to.deep.equal(expectedAction);
  });

  it('handles action type COMMON_GET_TRAVELS_BEGIN correctly', () => {
    const prevState = { getTravelsPending: false };
    const state = reducer(
      prevState,
      { type: COMMON_GET_TRAVELS_BEGIN }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getTravelsPending).to.be.true;
  });

  it('handles action type COMMON_GET_TRAVELS_SUCCESS correctly', () => {
    const prevState = { getTravelsPending: true };
    const state = reducer(
      prevState,
      { type: COMMON_GET_TRAVELS_SUCCESS, data: {} }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getTravelsPending).to.be.false;
  });

  it('handles action type COMMON_GET_TRAVELS_FAILURE correctly', () => {
    const prevState = { getTravelsPending: true };
    const state = reducer(
      prevState,
      { type: COMMON_GET_TRAVELS_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getTravelsPending).to.be.false;
    expect(state.getTravelsError).to.exist;
  });

  it('handles action type COMMON_GET_TRAVELS_DISMISS_ERROR correctly', () => {
    const prevState = { getTravelsError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: COMMON_GET_TRAVELS_DISMISS_ERROR }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getTravelsError).to.be.null;
  });
});
