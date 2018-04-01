import api from '../../../api';
import {
  CREATE_TRAVEL_CREATE_TRAVEL_BEGIN,
  CREATE_TRAVEL_CREATE_TRAVEL_SUCCESS,
  CREATE_TRAVEL_CREATE_TRAVEL_FAILURE,
  CREATE_TRAVEL_CREATE_TRAVEL_DISMISS_ERROR,
} from './constants';

// Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
// If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
export function createTravel(travelInfos = {}) {
  return async (dispatch, getState) => { // optionally you can have getState as the second argument
    try {
      dispatch({
        type: CREATE_TRAVEL_CREATE_TRAVEL_BEGIN,
      });
      const { common: { token } } = getState();
      const { data: { travel } } = await api.post('/travels/', travelInfos, { headers: { Authorization: token } });
      dispatch({
        type: CREATE_TRAVEL_CREATE_TRAVEL_SUCCESS,
        data,
      });
    } catch (error) {
      dispatch({
        type: CREATE_TRAVEL_CREATE_TRAVEL_FAILURE,
        data: { error },
      });
    }
  };
}

// Async action saves request error by default, this method is used to dismiss the error info.
// If you don't want errors to be saved in Redux store, just ignore this method.
export function dismissCreateTravelError() {
  return {
    type: CREATE_TRAVEL_CREATE_TRAVEL_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case CREATE_TRAVEL_CREATE_TRAVEL_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        createTravelPending: true,
        createTravelError: null,
      };

    case CREATE_TRAVEL_CREATE_TRAVEL_SUCCESS:
      // The request is success
      return {
        ...state,
        createTravelPending: false,
        createTravelError: null,
      };

    case CREATE_TRAVEL_CREATE_TRAVEL_FAILURE:
      // The request is failed
      return {
        ...state,
        createTravelPending: false,
        createTravelError: action.data.error,
      };

    case CREATE_TRAVEL_CREATE_TRAVEL_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        createTravelError: null,
      };

    default:
      return state;
  }
}
