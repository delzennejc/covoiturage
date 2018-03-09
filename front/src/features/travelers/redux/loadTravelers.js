// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import {
  TRAVELERS_LOAD_TRAVELERS,
} from './constants';

export function loadTravelers(users) {
  return {
    type: TRAVELERS_LOAD_TRAVELERS,
    users
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case TRAVELERS_LOAD_TRAVELERS:
      return {
        ...state,
        travelers: action.users
          .filter(u => u.role.includes('traveler'))
          .map(u => u._id)
      };

    default:
      return state;
  }
}
