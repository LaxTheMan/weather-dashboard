import axios from "axios";
import { formatTo12Hour } from "./date";

const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export type Weather = {
  date: number;
  weather: string;
  weatherIcon: string;
  temp: number;
  feelsLike: number;
  description: string;
  windSpeed: number;
  pressure: number;
  humidity: number;
  dewPoint: number;
  visibility: number;
};

export type DayForecast = {
  date: number;
  weather: string;
  weatherIcon: string;
  temp: number;
  minTemp: number;
  maxTemp: number;
};

export type HourForecast = {
  date: string;
  temp: number;
  humidity: number;
};

type WeatherApiResponse = {
  coord: {
    lon: number;
    lat: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level?: number;
    grnd_level?: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
    gust?: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
};

type ForecastApiResponse = {
  cod: string;
  message: number;
  cnt: number;
  list: {
    dt: number;
    main: {
      temp: number;
      feels_like: number;
      temp_min: number;
      temp_max: number;
      pressure: number;
      sea_level: number;
      grnd_level: number;
      humidity: number;
      temp_kf: number;
    };
    weather: {
      id: number;
      main: string;
      description: string;
      icon: string;
    }[];
    clouds: {
      all: number;
    };
    wind: {
      speed: number;
      deg: number;
      gust: number;
    };
    visibility: number;
    pop: number;
    rain?: {
      "1h": number;
    };
    sys: {
      pod: string;
    };
    dt_txt: string;
  }[];
  city: {
    id: number;
    name: string;
    coord: {
      lat: number;
      lon: number;
    };
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
};

export const getWeatherByCity = async (city: string) => {
  const response = await axios.get(`${BASE_URL}/weather`, {
    params: {
      q: city,
      appid: API_KEY,
      units: "metric",
    },
  });
  return extractWeatherData(response.data);
};

export const getWeatherByCoordinates = async (lat: number, lon: number) => {
  const response = await axios.get(`${BASE_URL}/weather`, {
    params: {
      lat,
      lon,
      appid: API_KEY,
      units: "metric",
    },
  });
  return extractWeatherData(response.data);
};

export const getDailyForecast = async (lat: number, lon: number) => {
  const response = await axios.get(`${BASE_URL}/forecast`, {
    params: {
      lat,
      lon,
      appid: API_KEY,
      units: "metric",
    },
  });

  return extractDailyForecastData(response.data);
};
export const getHourlyForecast = async (lat: number, lon: number) => {
  const response = await axios.get(`${BASE_URL}/forecast`, {
    params: {
      lat,
      lon,
      cnt: 8,
      appid: API_KEY,
      units: "metric",
    },
  });

  return extractHourlyForecastData(response.data);
};

const extractWeatherData = (data: WeatherApiResponse): Weather => {
  return {
    date: data.dt,
    weather: data.weather[0].main,
    weatherIcon: data.weather[0].icon,
    temp: data.main.temp,
    feelsLike: data.main.feels_like,
    description: data.weather[0].description,
    windSpeed: data.wind.speed,
    pressure: data.main.pressure,
    humidity: data.main.humidity,
    dewPoint: 0,
    visibility: data.visibility,
  };
};

const extractDailyForecastData = (data: ForecastApiResponse): DayForecast[] => {
  return data.list
    .filter((_, index) => index % 8 === 0)
    .map((forecast) => ({
      date: forecast.dt,
      weather: forecast.weather[0].main,
      weatherIcon: forecast.weather[0].icon,
      temp: forecast.main.temp,
      minTemp: forecast.main.temp_min,
      maxTemp: forecast.main.temp_max,
    }));
};

const extractHourlyForecastData = (
  data: ForecastApiResponse
): HourForecast[] => {
  return data.list.map((forecast) => ({
    date: formatTo12Hour(forecast.dt),
    temp: forecast.main.temp,
    humidity: forecast.main.humidity,
  }));
};
