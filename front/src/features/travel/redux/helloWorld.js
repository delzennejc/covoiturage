import axios from 'axios';
import {
    TRAVEL_HELLO_WORLD_BEGIN,
    TRAVEL_HELLO_WORLD_SUCCESS,
    TRAVEL_HELLO_WORLD_FAILURE,
    TRAVEL_HELLO_WORLD_DISMISS_ERROR,
} from './constants';
  
// Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
// If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
export function helloWorld(args = {}) {
  return async (dispatch) => { // optionally you can have getState as the second argument
      try {
          dispatch({
              type: TRAVEL_HELLO_WORLD_BEGIN,
          });
          // replace this by the request you need to do
          const { data } = await axios.get('https://jsonplaceholder.typicode.com/posts');
          dispatch({
              type: TRAVEL_HELLO_WORLD_SUCCESS,
              data,
          });
      } catch (error) {
          dispatch({
              type: TRAVEL_HELLO_WORLD_FAILURE,
              data: { error },
          });
      }
  };
}
  
// Async action saves request error by default, this method is used to dismiss the error info.
// If you don't want errors to be saved in Redux store, just ignore this method.
export function dismissHelloWorldError() {
  return {
    type: TRAVEL_HELLO_WORLD_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case TRAVEL_HELLO_WORLD_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        helloWorldPending: true,
        helloWorldError: null,
      };

    case TRAVEL_HELLO_WORLD_SUCCESS:
      // The request is success
      return {
        ...state,
        data: action.data,
        helloWorldPending: false,
        helloWorldError: null,
      };

    case TRAVEL_HELLO_WORLD_FAILURE:
      // The request is failed
      return {
        ...state,
        helloWorldPending: false,
        helloWorldError: action.data.error,
      };

    case TRAVEL_HELLO_WORLD_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        helloWorldError: null,
      };

    default:
      return state;
  }
}