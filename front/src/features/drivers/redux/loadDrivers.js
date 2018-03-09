// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import {
  DRIVERS_LOAD_DRIVERS,
} from './constants';

export function loadDrivers(users) {
  return {
    type: DRIVERS_LOAD_DRIVERS,
    users
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case DRIVERS_LOAD_DRIVERS:
      return {
        ...state,
        drivers: action.users
          .filter(u => u.role.includes('driver'))
          .map(u => u._id)
      };

    default:
      return state;
  }
}
