import api from '../../../api';
import {
  COMMON_LOAD_FROM_TOKEN_BEGIN,
  COMMON_LOAD_FROM_TOKEN_SUCCESS,
  COMMON_LOGIN_SUCCESS,
  COMMON_LOAD_FROM_TOKEN_FAILURE,
  COMMON_LOAD_FROM_TOKEN_DISMISS_ERROR,
} from './constants';

// Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
// If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
export function loadFromToken() {
  return async (dispatch) => { // optionally you can have getState as the second argument
    try {
      // replace this by the request you need to do
      const token = localStorage.getItem('token'); // eslint-disable-line
      if (token) {
        dispatch({
          type: COMMON_LOAD_FROM_TOKEN_BEGIN,
        });
        dispatch({
          type: COMMON_LOGIN_SUCCESS,
          data: { token },
        });
        const { data } = await api.get('/users/me', {
          headers: { Authorization: token }
        });
        dispatch({
          type: COMMON_LOAD_FROM_TOKEN_SUCCESS,
          data,
        });
      }
    } catch (error) {
      dispatch({
        type: COMMON_LOAD_FROM_TOKEN_FAILURE,
        data: { error },
      });
    }
  };
}

// Async action saves request error by default, this method is used to dismiss the error info.
// If you don't want errors to be saved in Redux store, just ignore this method.
export function dismissLoadFromTokenError() {
  return {
    type: COMMON_LOAD_FROM_TOKEN_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case COMMON_LOAD_FROM_TOKEN_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        loadFromTokenPending: true,
        loadFromTokenError: null,
      };

    case COMMON_LOAD_FROM_TOKEN_SUCCESS:
      // The request is success
      return {
        ...state,
        userDetails: action.data,
        loadFromTokenPending: false,
        loadFromTokenError: null,
      };

    case COMMON_LOAD_FROM_TOKEN_FAILURE:
      // The request is failed
      return {
        ...state,
        loadFromTokenPending: false,
        loadFromTokenError: action.data.error,
      };

    case COMMON_LOAD_FROM_TOKEN_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        loadFromTokenError: null,
      };

    default:
      return state;
  }
}
