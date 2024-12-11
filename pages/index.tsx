/* eslint-disable @typescript-eslint/no-unused-vars */
import localFont from "next/font/local";
import { SearchBar } from "./ui/search";
import { WeatherCard, WeatherCardProps } from "./ui/weatherCard";
import { Button, Card, Flex } from "antd";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
} from "recharts";

import Title from "antd/es/typography/Title";
import React, { useEffect, useState } from "react";
import DetailedCard from "./ui/detailedCard";
import {
  DayForecast,
  getDailyForecast,
  getHourlyForecast,
  getWeatherByCity,
  getWeatherByCoordinates,
  HourForecast,
  Weather,
} from "./lib/weatherApi";
import axios from "axios";
import {
  formatDate,
  formatTime,
  getDayFromEpoch,
  getDayOfWeekFromEpoch,
} from "./lib/date";
// import MapComponent from "./ui/map";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

type coord = {
  lat: number;
  long: number;
};

export default function Home() {
  const [weatherData, setWeatherData] = useState<Weather>({
    date: 0,
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

  const [coordinates, setcoordinates] = useState<coord>({ lat: 0, long: 0 });

  const data = [
    { name: "Page A", uv: 400, pv: 2400, amt: 2400 },
    { name: "Page A", uv: 500, pv: 2400, amt: 2400 },
    { name: "Page A", uv: 600, pv: 2400, amt: 2400 },
  ];

  const fetchWeatherByCoordinates = async (lat: number, lon: number) => {
    try {
      const weather = await getWeatherByCoordinates(lat, lon);
      console.log(weather);
      setWeatherData(weather);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchDailyForecastByCoordinates = async (lat: number, lon: number) => {
    try {
      const dailyForecast = await getDailyForecast(lat, lon);
      console.log(dailyForecast);
      setDayForecastData(dailyForecast);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchHourlyForecastByCoordinates = async (lat: number, lon: number) => {
    try {
      const hourlyForecast = await getHourlyForecast(lat, lon);
      console.log(hourlyForecast);
      setHourlyForecastData(hourlyForecast);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchWeatherByCity = async (city: string) => {
    try {
      const weather = await getWeatherByCity(city);
      setWeatherData(weather);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await axios.get("http://ip-api.com/json");
        setcoordinates({
          lat: response.data["lat"],
          long: response.data["long"],
        });
      } catch (err) {
        console.log(err);
        setcoordinates({ lat: 28.6448, long: 77.216721 });
      }
    };
    fetchLocation();
    fetchWeatherByCoordinates(28.6448, 77.216721);
    fetchDailyForecastByCoordinates(28.6448, 77.216721);
    fetchHourlyForecastByCoordinates(28.6448, 77.216721);
  }, []);

  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} bg-white grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]`}
    >
      <main className="flex flex-col gap-6 row-start-2">
        <SearchBar />
        <Title level={1} underline>
          Kyoto, JP
        </Title>
        <Flex justify="space-between">
          <DetailedCard
            date={formatDate(weatherData.date)}
            time={formatTime(weatherData.date)}
            weather={weatherData?.weather}
            weatherIcon={weatherData.weatherIcon}
            temperature={weatherData?.temp}
            feelsLike={weatherData?.feelsLike}
            description={weatherData?.description}
            windSpeed={weatherData?.windSpeed}
            pressure={weatherData?.pressure}
            humidity={weatherData?.humidity}
            dewPoint={weatherData?.dewPoint}
            visibility={weatherData?.visibility}
            handleReload={() => fetchWeatherByCoordinates(28.6448, 77.216721)}
          />
          {/* <MapComponent latitude={35.011665} longitude={135.768326} /> */}
        </Flex>
        <div>
          <Title level={4}>5 Day Forecast</Title>
          <Flex gap="middle" align="start">
            {dayForecastData.map((forecast, index) => (
              <WeatherCard
                key={index}
                date={getDayFromEpoch(forecast.date)}
                day={getDayOfWeekFromEpoch(forecast.date).substring(0, 3)}
                weather={forecast.weather}
                weatherIcon={forecast.weatherIcon}
                temp={forecast.temp}
                minTemp={forecast.minTemp}
                maxTemp={forecast.maxTemp}
              />
            ))}
          </Flex>
        </div>
        <div>
          <Title level={4}>3 Hourly Forecast</Title>
          <Card bordered={false}>
            <LineChart width={600} height={300} data={hourlyForecastData}>
              <Line type="monotone" dataKey="temp" stroke="#8884d8" />
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis unit="°C" />
              <Legend />
              <Tooltip />
            </LineChart>
          </Card>
        </div>
      </main>
    </div>
  );
}
