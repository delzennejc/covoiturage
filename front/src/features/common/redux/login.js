import { push } from 'react-router-redux';
import api from '../../../api';
import {
  COMMON_LOGIN_BEGIN,
  COMMON_LOGIN_SUCCESS,
  COMMON_LOGIN_FAILURE,
  COMMON_LOGIN_DISMISS_ERROR,
} from './constants';

import { loadFromToken } from './loadFromToken';

// Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
// If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
export function login() {
  return async (dispatch, getState) => { // optionally you can have getState as the second argument
    try {
      dispatch({
        type: COMMON_LOGIN_BEGIN,
      });
      // replace this by the request you need to do
      const { common: { userInfos } } = getState();
      const { data } = await api.post('/users/authenticate', userInfos);
      localStorage.setItem('token', data.token); // eslint-disable-line
      dispatch({
        type: COMMON_LOGIN_SUCCESS,
        data,
      });
      await dispatch(loadFromToken());
      dispatch(push('/travels'));
    } catch (error) {
      dispatch({
        type: COMMON_LOGIN_FAILURE,
        data: { error },
      });
    }
  };
}

// Async action saves request error by default, this method is used to dismiss the error info.
// If you don't want errors to be saved in Redux store, just ignore this method.
export function dismissLoginError() {
  return {
    type: COMMON_LOGIN_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case COMMON_LOGIN_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        loginPending: true,
        loginError: null,
      };

    case COMMON_LOGIN_SUCCESS:
      // The request is success
      return {
        ...state,
        token: action.data.token,
        loginPending: false,
        loginError: null,
      };

    case COMMON_LOGIN_FAILURE:
      // The request is failed
      return {
        ...state,
        loginPending: false,
        loginError: action.data.error,
      };

    case COMMON_LOGIN_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        loginError: null,
      };

    default:
      return state;
  }
}
