// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import {
  TRAVELS_LOAD_TRAVELS,
} from './constants';

export function loadTravels(travels) {
  return {
    type: TRAVELS_LOAD_TRAVELS,
    travels
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case TRAVELS_LOAD_TRAVELS:
      return {
        ...state,
        travels: action.travels.map(tl => tl._id)
      };

    default:
      return state;
  }
}
