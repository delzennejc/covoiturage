import { push } from 'react-router-redux';
import api from '../../../api';
import {
  CREATE_ACCOUNT_CREATE_ACCOUNT_BEGIN,
  CREATE_ACCOUNT_CREATE_ACCOUNT_SUCCESS,
  CREATE_ACCOUNT_CREATE_ACCOUNT_FAILURE,
  CREATE_ACCOUNT_CREATE_ACCOUNT_DISMISS_ERROR,
} from './constants';

import { getUsers } from '../../common/redux/getUsers';

// Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
// If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
export function createAccount(userInfos = {}) {
  return async (dispatch, getState) => { // optionally you can have getState as the second argument
    try {
      dispatch({
        type: CREATE_ACCOUNT_CREATE_ACCOUNT_BEGIN,
      });
      const { common: { token } } = getState();
      const { data: { user } } = await api.post('/users/register', userInfos, { headers: { Authorization: token } });
      dispatch({
        type: CREATE_ACCOUNT_CREATE_ACCOUNT_SUCCESS,
        user,
      });
      await dispatch(getUsers()); 
      dispatch(push(`/${userInfos.role}s`));
    } catch (error) {
      dispatch({
        type: CREATE_ACCOUNT_CREATE_ACCOUNT_FAILURE,
        data: { error },
      });
    }
  };
}

// Async action saves request error by default, this method is used to dismiss the error info.
// If you don't want errors to be saved in Redux store, just ignore this method.
export function dismissCreateAccountError() {
  return {
    type: CREATE_ACCOUNT_CREATE_ACCOUNT_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case CREATE_ACCOUNT_CREATE_ACCOUNT_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        createAccountPending: true,
        createAccountError: null,
      };

    case CREATE_ACCOUNT_CREATE_ACCOUNT_SUCCESS:
      // The request is success
      return {
        ...state,
        createAccountPending: false,
        createAccountError: null,
      };

    case CREATE_ACCOUNT_CREATE_ACCOUNT_FAILURE:
      // The request is failed
      return {
        ...state,
        createAccountPending: false,
        createAccountError: action.data.error,
      };

    case CREATE_ACCOUNT_CREATE_ACCOUNT_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        createAccountError: null,
      };

    default:
      return state;
  }
}
