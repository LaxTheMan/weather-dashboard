import localFont from "next/font/local";
import { SearchBar } from "./ui/search";
import { WeatherCard } from "./ui/weatherCard";
import { Card, Flex } from "antd";
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
import React, { useEffect } from "react";
import DetailedCard from "./ui/detailedCard";

import {
  formatDate,
  formatTime,
  getDayFromEpoch,
  getDayOfWeekFromEpoch,
} from "./lib/date";
import { useWeather } from "./hooks/useWeather";
import { toTitleCase } from "./lib/misc";
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

export default function Home() {
  const {
    weatherData,
    dayForecastData,
    hourlyForecastData,
    coordinates,
    fetchLocation,
    fetchDailyForecastByCoordinates,
    fetchHourlyForecastByCoordinates,
    fetchWeatherByCoordinates,
    fetchAllWeatherByCity,
  } = useWeather();

  useEffect(() => {
    fetchLocation();
  }, []);

  useEffect(() => {
    if (coordinates.lat !== 0 && coordinates.lon !== 0) {
      fetchWeatherByCoordinates(coordinates);
      fetchDailyForecastByCoordinates(coordinates);
      fetchHourlyForecastByCoordinates(coordinates);
    }
  }, [coordinates]);

  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} bg-white grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]`}
    >
      <main className="flex flex-col gap-6 row-start-2">
        <SearchBar onSearch={fetchAllWeatherByCity} />
        <Title level={1} underline>
          {toTitleCase(weatherData.city)}, {weatherData.cityCode}
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
            clouds={weatherData?.clouds}
            visibility={weatherData?.visibility}
            handleReload={() => fetchWeatherByCoordinates(coordinates)}
          />
          {/* <MapComponent
            
            latitude={coordinates.lat}
            longitude={coordinates.long}
          /> */}
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
