export const NAME = 'STORAGE';

export const GET_WEATHERCAST = 'STORAGE/GET_WEATHERCAST';
export const GET_WEATHERCAST_SUCCESS = 'STORAGE/GET_WEATHERCAST_SUCCESS';
export const GET_WEATHERCAST_FAIL = 'STORAGE/GET_WEATHERCAST_FAIL';

export const getWeather = () => ({
  type: GET_WEATHERCAST,
});
export const getWeatherSuccess = data => ({
  type: GET_WEATHERCAST_SUCCESS,
  data,
});
export const getWeatherFail = message => ({
  type: GET_WEATHERCAST_FAIL,
  message,
});
