import axios from 'axios';
import {
    ${actionTypes.begin},
    ${actionTypes.success},
    ${actionTypes.failure},
    ${actionTypes.dismissError},
} from './constants';
  
// Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
// If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
export function ${_.camelCase(action)}(args = {}) {
  return async (dispatch) => { // optionally you can have getState as the second argument
      try {
          dispatch({
              type: ${actionTypes.begin},
          });
          // replace this by the request you need to do
          const { data } = await axios.get('https://jsonplaceholder.typicode.com/posts');
          dispatch({
              type: ${actionTypes.success},
              data,
          });
      } catch (error) {
          dispatch({
              type: ${actionTypes.failure},
              data: { error },
          });
      }
  };
}
  
// Async action saves request error by default, this method is used to dismiss the error info.
// If you don't want errors to be saved in Redux store, just ignore this method.
export function dismiss${_.pascalCase(action)}Error() {
  return {
    type: ${actionTypes.dismissError},
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case ${actionTypes.begin}:
      // Just after a request is sent
      return {
        ...state,
        ${_.camelCase(action)}Pending: true,
        ${_.camelCase(action)}Error: null,
      };

    case ${actionTypes.success}:
      // The request is success
      return {
        ...state,
        ${_.camelCase(action)}Pending: false,
        ${_.camelCase(action)}Error: null,
      };

    case ${actionTypes.failure}:
      // The request is failed
      return {
        ...state,
        ${_.camelCase(action)}Pending: false,
        ${_.camelCase(action)}Error: action.data.error,
      };

    case ${actionTypes.dismissError}:
      // Dismiss the request failure error
      return {
        ...state,
        ${_.camelCase(action)}Error: null,
      };

    default:
      return state;
  }
}