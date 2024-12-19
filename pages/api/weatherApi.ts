/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios";
import { ForecastApiResponse, WeatherApiResponse } from "@/types/ResponseTypes";
import { DayForecast, HourForecast, Weather } from "@/types/WeatherTypes";
import { formatTo12Hour } from "@/utils/date";

const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export const getWeatherByCity = async (city: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/weather`, {
      params: {
        q: city,
        appid: API_KEY,
        units: "metric",
      },
    });
    return extractWeatherData(response.data);
  } catch (err) {
    throw new Error("Error fetching weather data.");
  }
};

export const getWeatherByCoordinates = async (lat: number, lon: number) => {
  try {
    const response = await axios.get(`${BASE_URL}/weather`, {
      params: {
        lat: lat,
        lon: lon,
        appid: API_KEY,
        units: "metric",
      },
    });
    return extractWeatherData(response.data);
  } catch (err) {
    throw new Error("Error fetching weather data.");
  }
};

export const getDailyForecast = async (lat: number, lon: number) => {
  try {
    const response = await axios.get(`${BASE_URL}/forecast`, {
      params: {
        lat: lat,
        lon: lon,
        appid: API_KEY,
        units: "metric",
      },
    });

    return extractDailyForecastData(response.data);
  } catch (err) {
    throw new Error("Error fetching daily forecast.");
  }
};
export const getHourlyForecast = async (lat: number, lon: number) => {
  try {
    const response = await axios.get(`${BASE_URL}/forecast`, {
      params: {
        lat: lat,
        lon: lon,
        cnt: 8,
        appid: API_KEY,
        units: "metric",
      },
    });
    return extractHourlyForecastData(response.data);
  } catch (err) {
    throw new Error("Error fetching hourly forecast.");
  }
};

const extractWeatherData = (data: WeatherApiResponse): Weather => {
  return {
    date: Math.floor(Date.now() / 1000),
    city: data.name,
    cityCode: data.sys.country,
    weather: data.weather[0].main,
    weatherIcon: data.weather[0].icon,
    temp: data.main.temp,
    feelsLike: data.main.feels_like,
    description: data.weather[0].description,
    windSpeed: data.wind.speed,
    pressure: data.main.pressure,
    humidity: data.main.humidity,
    clouds: data.clouds.all,
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
    wind: forecast.wind.speed,
  }));
};
