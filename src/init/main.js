import React, {PureComponent} from 'react';
import {Provider} from 'react-redux';
import {persistReducer, persistStore} from 'redux-persist';
import {PersistGate} from 'redux-persist/lib/integration/react';
import AsyncStorage from '@react-native-community/async-storage';
import AppNavigator from './router';
import createStore from './createStore';
import createReducers from './ducks';

// import {NAME as STORAGE_NAME} from '@reducers/storage/ducks';

const persistConfig = {
  timeout: 10000,
  key: 'root',
  storage: AsyncStorage,
  // whitelist: If you want to persist a part of your state
  whitelist: [],
  // whitelist: [STORAGE_NAME],
};

const rootReducer = createReducers();
const appPersistReducer = persistReducer(persistConfig, rootReducer);
export const store = createStore(appPersistReducer);
const persistor = persistStore(store);

console.ignoredYellowBox = ['Remote debugger'];
// Reset Store
// persistor.purge();

class Main extends PureComponent {
  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <AppNavigator />
        </PersistGate>
      </Provider>
    );
  }
}

export default Main;
