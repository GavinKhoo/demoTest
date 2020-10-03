import {combineReducers} from 'redux';

// import Storage from '../reducers/storage';
import Storage from '@reducers/storage';

const createReducers = (reducers = {}) =>
  combineReducers({
    ...reducers,
    [Storage.ducks.NAME]: Storage.reducer,
  });

export default createReducers;
