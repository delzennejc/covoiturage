import api from '../../../api';
import {
  COMMON_GET_USERS_BEGIN,
  COMMON_GET_USERS_SUCCESS,
  COMMON_GET_USERS_FAILURE,
  COMMON_GET_USERS_DISMISS_ERROR,
  COMMON_CREATE_ACCOUNT,
} from './constants';

import {
  TRAVELERS_LOAD_TRAVELERS
} from '../../travelers/redux/constants';
import {
  DRIVERS_LOAD_DRIVERS
} from '../../drivers/redux/constants';

// Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
// If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
export function getUsers() {
  return async (dispatch, getState) => { // optionally you can have getState as the second argument
    try {
      dispatch({
        type: COMMON_GET_USERS_BEGIN,
      });
      // replace this by the request you need to do
      const { common: { token } } = getState();
      const { data } = await api.get('/users', { headers: { Authorization: token } });
      dispatch({
        type: COMMON_GET_USERS_SUCCESS,
        data,
      });
      dispatch({
        type: TRAVELERS_LOAD_TRAVELERS,
        users: data
      });
      dispatch({
        type: DRIVERS_LOAD_DRIVERS,
        users: data
      });
    } catch (error) {
      dispatch({
        type: COMMON_GET_USERS_FAILURE,
        data: { error },
      });
    }
  };
}

// Async action saves request error by default, this method is used to dismiss the error info.
// If you don't want errors to be saved in Redux store, just ignore this method.
export function dismissGetUsersError() {
  return {
    type: COMMON_GET_USERS_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case COMMON_GET_USERS_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        getUsersPending: true,
        getUsersError: null,
      };

    case COMMON_CREATE_ACCOUNT:
      return {
        ...state,
        users: {
          ...state.users,
          [action.user._id]: action.user,
        }
      };

    case COMMON_GET_USERS_SUCCESS:
      // The request is success
      return {
        ...state,
        users: action.data.reduce((acc, u) => ({ ...acc, [u._id]: u }), {}),
        getUsersPending: false,
        getUsersError: null,
      };

    case COMMON_GET_USERS_FAILURE:
      // The request is failed
      return {
        ...state,
        getUsersPending: false,
        getUsersError: action.data.error,
      };

    case COMMON_GET_USERS_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        getUsersError: null,
      };

    default:
      return state;
  }
}
