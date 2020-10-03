export const fetchWeather = currency => {
  const apiUrl =
    'https://api.weatherbit.io/v2.0/forecast/daily?key=7d2cef139d274356b1453f0bd0bdf885&lang=en&days=16&city_id=1735161';
  // const apiUrl =
  // 'https://free.currconv.com/api/v7/convert?q=MYR_USD&compact=ultra&apiKey=610610cd6f131910dab0';
  return fetch(apiUrl)
    .then(response => response.json())
    .then(json => json)
    .catch(error => {
      console.log(error);
      throw error;
    });
};

//HourlyApi
// https://api.weatherbit.io/v2.0/forecast/hourly?city_id=1735161&key=7d2cef139d274356b1453f0bd0bdf885&hours=24
