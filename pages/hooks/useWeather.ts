import { useState } from "react";
import {
  DayForecast,
  getDailyForecast,
  getHourlyForecast,
  getWeatherByCity,
  getWeatherByCoordinates,
  HourForecast,
  Weather,
} from "../api/weatherApi";
import axios from "axios";
import { getCoordinatesByCity } from "../api/geocodingApi";

export type Coord = {
  lat: number;
  lon: number;
};

export const useWeather = () => {
  const [weatherData, setWeatherData] = useState<Weather>({
    date: 0,
    city: "",
    cityCode: "",
    weather: "",
    weatherIcon: "",
    description: "",
    dewPoint: 0,
    feelsLike: 0,
    humidity: 0,
    pressure: 0,
    temp: 0,
    visibility: 0,
    windSpeed: 0,
  });

  const [dayForecastData, setDayForecastData] = useState<DayForecast[]>([]);
  const [hourlyForecastData, setHourlyForecastData] = useState<HourForecast[]>(
    []
  );
  const [coordinates, setCoordinates] = useState<Coord>({ lat: 0, lon: 0 });

  const fetchLocation = async () => {
    try {
      const response = await axios.get("http://ip-api.com/json");
      setCoordinates({
        lat: response.data.lat,
        lon: response.data.lon,
      });
    } catch (err) {
      console.log(err);
      // Set to default coordinates if error
      setCoordinates({ lat: 28.6448, lon: 77.216721 });
    }
  };

  const fetchWeatherByCoordinates = async (coord: Coord) => {
    try {
      const weather = await getWeatherByCoordinates(coord.lat, coord.lon);
      setWeatherData(weather);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchDailyForecastByCoordinates = async (coord: Coord) => {
    try {
      const dailyForecast = await getDailyForecast(coord.lat, coord.lon);
      setDayForecastData(dailyForecast);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchHourlyForecastByCoordinates = async (coord: Coord) => {
    try {
      const hourlyForecast = await getHourlyForecast(coord.lat, coord.lon);
      setHourlyForecastData(hourlyForecast);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchAllWeatherByCity = async (city: string) => {
    try {
      const coord: Coord = await getCoordinatesByCity(city);

      // Do api calls in parallel
      const [weather, dailyForecast, hourlyForecast] = await Promise.all([
        getWeatherByCity(city),
        getDailyForecast(coord.lat, coord.lon),
        getHourlyForecast(coord.lat, coord.lon),
      ]);

      setWeatherData(weather);
      setDayForecastData(dailyForecast);
      setHourlyForecastData(hourlyForecast);
    } catch (err) {
      console.log(err);
    }
  };

  return {
    weatherData,
    dayForecastData,
    hourlyForecastData,
    coordinates,
    fetchLocation,
    fetchDailyForecastByCoordinates,
    fetchHourlyForecastByCoordinates,
    fetchAllWeatherByCity,
    fetchWeatherByCoordinates,
  };
};
