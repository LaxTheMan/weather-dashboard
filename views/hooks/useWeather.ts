import { useState } from "react";
import {
  DayForecast,
  getDailyForecast,
  getHourlyForecast,
  getWeatherByCity,
  getWeatherByCoordinates,
  HourForecast,
  Weather,
} from "../../pages/api/weatherApi";
import { getCoordinatesByCity } from "@/pages/api/geocodingApi";

export type Coord = {
  lat: number;
  lon: number;
};

export const useWeather = () => {
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [weatherData, setWeatherData] = useState<Weather>({
    date: 0,
    city: "",
    cityCode: "",
    weather: "",
    weatherIcon: "",
    description: "",
    clouds: 0,
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

  const fetchInitialLocation = async () => {
    try {
      // Call the /api/getLocation endpoint (the server-side API route we created)
      const response = await fetch("/api/getLocation");
      if (!response.ok) {
        throw new Error("Failed to fetch location");
      }
      const coords: Coord = await response.json();
      setCoordinates(coords);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setError("Failed to get location. Using default coordinates.");
      // Set to default coordinates if error
      setCoordinates({
        lat: 28.6448,
        lon: 77.216721,
      });
      setLoading(false);
    }
  };

  const fetchWeatherByCoordinates = async (coord: Coord) => {
    try {
      const weather = await getWeatherByCoordinates(coord.lat, coord.lon);
      setWeatherData(weather);
    } catch (err) {
      console.log(err);
      setError("Error fetching weather data. Please try again later.");
    }
  };

  const fetchDailyForecastByCoordinates = async (coord: Coord) => {
    try {
      const dailyForecast = await getDailyForecast(coord.lat, coord.lon);
      setDayForecastData(dailyForecast);
    } catch (err) {
      console.log(err);
      setError("Error fetching daily forecast. Please try again later.");
    }
  };

  const fetchHourlyForecastByCoordinates = async (coord: Coord) => {
    try {
      const hourlyForecast = await getHourlyForecast(coord.lat, coord.lon);
      setHourlyForecastData(hourlyForecast);
    } catch (err) {
      console.log(err);
      setError("Error fetching hourly forecast. Please try again later.");
    }
  };

  const fetchAllWeatherByCity = async (city: string) => {
    try {
      setError(""); // Clear previous errors
      const coord: Coord = await getCoordinatesByCity(city);

      // Do api calls in parallel
      const [weather, dailyForecast, hourlyForecast] = await Promise.all([
        getWeatherByCity(city),
        getDailyForecast(coord.lat, coord.lon),
        getHourlyForecast(coord.lat, coord.lon),
      ]);

      setCoordinates(coord);
      setWeatherData(weather);
      setDayForecastData(dailyForecast);
      setHourlyForecastData(hourlyForecast);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(err);
      if (err.response?.status === 404) {
        setError("City not found. Please enter a valid city.");
      } else {
        setError("Error fetching data. Please try again later.");
      }
    }
  };

  return {
    error,
    loading,
    weatherData,
    dayForecastData,
    hourlyForecastData,
    coordinates,
    setError,
    fetchInitialLocation,
    fetchDailyForecastByCoordinates,
    fetchHourlyForecastByCoordinates,
    fetchAllWeatherByCity,
    fetchWeatherByCoordinates,
  };
};
