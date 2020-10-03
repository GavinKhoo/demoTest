import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import Saga from './sagas';

const sagaMiddleware = createSagaMiddleware();
let middleware = applyMiddleware(sagaMiddleware);

export default (reducers, data = {}) => {
  const store = createStore(reducers, data, middleware);
  sagaMiddleware.run(Saga);
  return store;
};
