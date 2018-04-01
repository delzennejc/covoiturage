import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { expect } from 'chai';

import {
  CREATE_TRAVEL_CREATE_TRAVEL_BEGIN,
  CREATE_TRAVEL_CREATE_TRAVEL_SUCCESS,
  CREATE_TRAVEL_CREATE_TRAVEL_FAILURE,
  CREATE_TRAVEL_CREATE_TRAVEL_DISMISS_ERROR,
} from 'src/features/create-travel/redux/constants';

import {
  createTravel,
  dismissCreateTravelError,
  reducer,
} from 'src/features/create-travel/redux/createTravel';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('create-travel/redux/createTravel', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when createTravel succeeds', () => {
    const store = mockStore({});

    return store.dispatch(createTravel())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', CREATE_TRAVEL_CREATE_TRAVEL_BEGIN);
        expect(actions[1]).to.have.property('type', CREATE_TRAVEL_CREATE_TRAVEL_SUCCESS);
      });
  });

  it('dispatches failure action when createTravel fails', () => {
    const store = mockStore({});

    return store.dispatch(createTravel({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', CREATE_TRAVEL_CREATE_TRAVEL_BEGIN);
        expect(actions[1]).to.have.property('type', CREATE_TRAVEL_CREATE_TRAVEL_FAILURE);
        expect(actions[1]).to.have.nested.property('data.error').that.exist;
      });
  });

  it('returns correct action by dismissCreateTravelError', () => {
    const expectedAction = {
      type: CREATE_TRAVEL_CREATE_TRAVEL_DISMISS_ERROR,
    };
    expect(dismissCreateTravelError()).to.deep.equal(expectedAction);
  });

  it('handles action type CREATE_TRAVEL_CREATE_TRAVEL_BEGIN correctly', () => {
    const prevState = { createTravelPending: false };
    const state = reducer(
      prevState,
      { type: CREATE_TRAVEL_CREATE_TRAVEL_BEGIN }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.createTravelPending).to.be.true;
  });

  it('handles action type CREATE_TRAVEL_CREATE_TRAVEL_SUCCESS correctly', () => {
    const prevState = { createTravelPending: true };
    const state = reducer(
      prevState,
      { type: CREATE_TRAVEL_CREATE_TRAVEL_SUCCESS, data: {} }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.createTravelPending).to.be.false;
  });

  it('handles action type CREATE_TRAVEL_CREATE_TRAVEL_FAILURE correctly', () => {
    const prevState = { createTravelPending: true };
    const state = reducer(
      prevState,
      { type: CREATE_TRAVEL_CREATE_TRAVEL_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.createTravelPending).to.be.false;
    expect(state.createTravelError).to.exist;
  });

  it('handles action type CREATE_TRAVEL_CREATE_TRAVEL_DISMISS_ERROR correctly', () => {
    const prevState = { createTravelError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: CREATE_TRAVEL_CREATE_TRAVEL_DISMISS_ERROR }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.createTravelError).to.be.null;
  });
});
