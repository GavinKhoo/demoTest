import {combineReducers} from 'redux';
import * as ducks from './ducks';
import _ from 'lodash';

const initialState = {
  weatherData: null,
};

const storageReducer = (state = initialState, action) => {
  switch (action.type) {
    case ducks.GET_WEATHERCAST:
      return {
        ...state,
        isFetching: true,
      };
    case ducks.GET_WEATHERCAST_SUCCESS:
      return {
        ...state,
        isFetching: false,
        weatherData: action.data,
      };
    case ducks.GET_WEATHERCAST_FAIL:
      return {
        ...state,
        isFetching: false,
      };
    default:
      return state;
  }
};

export default combineReducers({
  storageReducer,
});
