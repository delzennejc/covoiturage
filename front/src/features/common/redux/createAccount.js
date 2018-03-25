// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import {
  COMMON_CREATE_ACCOUNT,
} from './constants';

export function createAccount(user) {
  return {
    type: COMMON_CREATE_ACCOUNT,
    user
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case COMMON_CREATE_ACCOUNT:
      return {
        ...state,
      };

    default:
      return state;
  }
}
