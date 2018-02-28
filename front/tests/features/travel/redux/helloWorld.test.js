import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { expect } from 'chai';

import {
  TRAVEL_HELLO_WORLD_BEGIN,
  TRAVEL_HELLO_WORLD_SUCCESS,
  TRAVEL_HELLO_WORLD_FAILURE,
  TRAVEL_HELLO_WORLD_DISMISS_ERROR,
} from 'src/features/travel/redux/constants';

import {
  helloWorld,
  dismissHelloWorldError,
  reducer,
} from 'src/features/travel/redux/helloWorld';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('travel/redux/helloWorld', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when helloWorld succeeds', () => {
    const store = mockStore({});

    return store.dispatch(helloWorld())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', TRAVEL_HELLO_WORLD_BEGIN);
        expect(actions[1]).to.have.property('type', TRAVEL_HELLO_WORLD_SUCCESS);
      });
  });

  it('dispatches failure action when helloWorld fails', () => {
    const store = mockStore({});

    return store.dispatch(helloWorld({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', TRAVEL_HELLO_WORLD_BEGIN);
        expect(actions[1]).to.have.property('type', TRAVEL_HELLO_WORLD_FAILURE);
        expect(actions[1]).to.have.nested.property('data.error').that.exist;
      });
  });

  it('returns correct action by dismissHelloWorldError', () => {
    const expectedAction = {
      type: TRAVEL_HELLO_WORLD_DISMISS_ERROR,
    };
    expect(dismissHelloWorldError()).to.deep.equal(expectedAction);
  });

  it('handles action type TRAVEL_HELLO_WORLD_BEGIN correctly', () => {
    const prevState = { helloWorldPending: false };
    const state = reducer(
      prevState,
      { type: TRAVEL_HELLO_WORLD_BEGIN }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.helloWorldPending).to.be.true;
  });

  it('handles action type TRAVEL_HELLO_WORLD_SUCCESS correctly', () => {
    const prevState = { helloWorldPending: true };
    const state = reducer(
      prevState,
      { type: TRAVEL_HELLO_WORLD_SUCCESS, data: {} }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.helloWorldPending).to.be.false;
  });

  it('handles action type TRAVEL_HELLO_WORLD_FAILURE correctly', () => {
    const prevState = { helloWorldPending: true };
    const state = reducer(
      prevState,
      { type: TRAVEL_HELLO_WORLD_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.helloWorldPending).to.be.false;
    expect(state.helloWorldError).to.exist;
  });

  it('handles action type TRAVEL_HELLO_WORLD_DISMISS_ERROR correctly', () => {
    const prevState = { helloWorldError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: TRAVEL_HELLO_WORLD_DISMISS_ERROR }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.helloWorldError).to.be.null;
  });
});
