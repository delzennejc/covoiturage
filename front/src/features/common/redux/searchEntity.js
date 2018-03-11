// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import {
  COMMON_SEARCH_ENTITY,
} from './constants';

export function searchEntity(value) {
  return {
    type: COMMON_SEARCH_ENTITY,
    value
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case COMMON_SEARCH_ENTITY:
      return {
        ...state,
        search: {
          ...state.search,
          value: action.value,
        }
      };

    default:
      return state;
  }
}
