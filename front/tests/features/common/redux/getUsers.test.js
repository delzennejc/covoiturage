import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { expect } from 'chai';

import {
  COMMON_GET_USERS_BEGIN,
  COMMON_GET_USERS_SUCCESS,
  COMMON_GET_USERS_FAILURE,
  COMMON_GET_USERS_DISMISS_ERROR,
} from 'src/features/common/redux/constants';

import {
  getUsers,
  dismissGetUsersError,
  reducer,
} from 'src/features/common/redux/getUsers';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('common/redux/getUsers', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when getUsers succeeds', () => {
    const store = mockStore({});

    return store.dispatch(getUsers())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', COMMON_GET_USERS_BEGIN);
        expect(actions[1]).to.have.property('type', COMMON_GET_USERS_SUCCESS);
      });
  });

  it('dispatches failure action when getUsers fails', () => {
    const store = mockStore({});

    return store.dispatch(getUsers({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', COMMON_GET_USERS_BEGIN);
        expect(actions[1]).to.have.property('type', COMMON_GET_USERS_FAILURE);
        expect(actions[1]).to.have.nested.property('data.error').that.exist;
      });
  });

  it('returns correct action by dismissGetUsersError', () => {
    const expectedAction = {
      type: COMMON_GET_USERS_DISMISS_ERROR,
    };
    expect(dismissGetUsersError()).to.deep.equal(expectedAction);
  });

  it('handles action type COMMON_GET_USERS_BEGIN correctly', () => {
    const prevState = { getUsersPending: false };
    const state = reducer(
      prevState,
      { type: COMMON_GET_USERS_BEGIN }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getUsersPending).to.be.true;
  });

  it('handles action type COMMON_GET_USERS_SUCCESS correctly', () => {
    const prevState = { getUsersPending: true };
    const state = reducer(
      prevState,
      { type: COMMON_GET_USERS_SUCCESS, data: {} }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getUsersPending).to.be.false;
  });

  it('handles action type COMMON_GET_USERS_FAILURE correctly', () => {
    const prevState = { getUsersPending: true };
    const state = reducer(
      prevState,
      { type: COMMON_GET_USERS_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getUsersPending).to.be.false;
    expect(state.getUsersError).to.exist;
  });

  it('handles action type COMMON_GET_USERS_DISMISS_ERROR correctly', () => {
    const prevState = { getUsersError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: COMMON_GET_USERS_DISMISS_ERROR }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getUsersError).to.be.null;
  });
});
