import {takeLatest, call, put, all, select} from 'redux-saga/effects';
import * as ducks from './ducks';
import * as api from './api';

function* fetchWeather(action) {
  try {
    const response = yield call(api.fetchWeather);
    yield put(ducks.getWeatherSuccess(response));
  } catch (e) {
    yield put(ducks.getWeatherFail(e));
  }
}
function* watchfetchWeather() {
  yield takeLatest(ducks.GET_WEATHERCAST, fetchWeather);
}

export default function* storageSaga() {
  yield all([watchfetchWeather()]);
}
