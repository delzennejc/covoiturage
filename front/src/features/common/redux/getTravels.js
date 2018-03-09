import api from '../../../api';
import {
  COMMON_GET_TRAVELS_BEGIN,
  COMMON_GET_TRAVELS_SUCCESS,
  COMMON_GET_TRAVELS_FAILURE,
  COMMON_GET_TRAVELS_DISMISS_ERROR,
} from './constants';

import {
  TRAVELS_LOAD_TRAVELS
} from '../../travels/redux/constants';

// Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
// If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
export function getTravels() {
  return async (dispatch, getState) => { // optionally you can have getState as the second argument
    try {
      dispatch({
        type: COMMON_GET_TRAVELS_BEGIN,
      });
      // replace this by the request you need to do
      const { common: { token } } = getState();
      const { data } = await api.get('/travels', { headers: { Authorization: token } });
      dispatch({
        type: COMMON_GET_TRAVELS_SUCCESS,
        data,
      });
      dispatch({
        type: TRAVELS_LOAD_TRAVELS,
        travels: data,
      });
    } catch (error) {
      dispatch({
        type: COMMON_GET_TRAVELS_FAILURE,
        data: { error },
      });
    }
  };
}

// Async action saves request error by default, this method is used to dismiss the error info.
// If you don't want errors to be saved in Redux store, just ignore this method.
export function dismissGetTravelsError() {
  return {
    type: COMMON_GET_TRAVELS_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case COMMON_GET_TRAVELS_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        getTravelsPending: true,
        getTravelsError: null,
      };

    case COMMON_GET_TRAVELS_SUCCESS:
      // The request is success
      return {
        ...state,
        travels: action.data.reduce((acc, tl) => ({ ...acc, [tl._id]: tl }), {}),
        getTravelsPending: false,
        getTravelsError: null,
      };

    case COMMON_GET_TRAVELS_FAILURE:
      // The request is failed
      return {
        ...state,
        getTravelsPending: false,
        getTravelsError: action.data.error,
      };

    case COMMON_GET_TRAVELS_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        getTravelsError: null,
      };

    default:
      return state;
  }
}
