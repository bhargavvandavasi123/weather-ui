import { DateTime } from "luxon";

const API_KEY = "82bc4b161959cf1842d83d335c60c0e9";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

const getWeatherData = (infoType, searchParams) => {
  const url = new URL(BASE_URL + "/" + infoType);
  url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });

  return fetch(url).then((res) => res.json());
};

const formatCurrentWeather = (data) => {
  const {
    coord: { lat, lon },
    main: { temp, feels_like, temp_min, temp_max, humidity },
    name,
    dt,
    sys: { country, sunrise, sunset },
    weather,
    wind: { speed },
  } = data;

  const { description, icon } = weather[0];
  return {
    lat,
    lon,
    temp,
    feels_like,
    temp_min,
    temp_max,
    humidity,
    name,
    dt,
    country,
    sunrise,
    sunset,
    description,
    icon,
    speed,
  };
};

const formatForecastWeather = (data) => {
  let { list, city } = data;
  let { timezone, population } = city;

  list = list.slice(1, 6).map((d) => {
    return {
      title: formatToLocalTime(d.dt, timezone, "hh:mm a"),
      day: formatToLocalTime(d.dt, timezone, "cccc"),
      windSpeed: d.wind.speed,
      grnd_level: d.main.grnd_level,
      pressure: d.main.pressure,
      sea_level: d.main.sea_level,
      windDegree: d.wind.deg,
      windGust: d.wind.gust,
      visibility: d.visibility,
      temp: d.main.temp,
      humidity: d.main.humidity,
      description: d.weather[0].description,
    };
  });
  return { list, population, timezone };
};

const getFormattedWeatherData = async (searchParams) => {
  const formattedCurrentWeather = await getWeatherData(
    "weather",
    searchParams
  ).then(formatCurrentWeather);

  const { lat, lon } = formattedCurrentWeather;

  const formattedForecastWeather = await getWeatherData("forecast", {
    lat,
    lon,
    units: searchParams.units,
  }).then(formatForecastWeather);

  return { ...formattedCurrentWeather, ...formattedForecastWeather };
};

const formatToLocalTime = (
  secs,
  zone,
  format = "cccc, dd LLLL yyyy' | Local time: 'hh:mm a"
) => DateTime.fromSeconds(secs).setZone(zone).toFormat(format);
export default getFormattedWeatherData;

export { formatToLocalTime };
