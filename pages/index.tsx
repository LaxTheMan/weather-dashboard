/* eslint-disable react-hooks/exhaustive-deps */
import localFont from "next/font/local";
import { SearchBar } from "./ui/search";
import { WeatherCard } from "./ui/weatherCard";
import { Card, Flex, Segmented, Spin } from "antd";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import Title from "antd/es/typography/Title";
import React, { useEffect, useState } from "react";
import DetailedCard from "./ui/detailedCard";

import {
  formatDate,
  formatTime,
  getDayFromEpoch,
  getDayOfWeekFromEpoch,
} from "./lib/date";
import { useWeather } from "./hooks/useWeather";
import { toTitleCase } from "./lib/misc";
import { LazyMap } from "./ui/MapComponent";

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
    error,
    loading,
    weatherData,
    dayForecastData,
    hourlyForecastData,
    coordinates,
    setError,
    fetchLocation,
    fetchDailyForecastByCoordinates,
    fetchHourlyForecastByCoordinates,
    fetchWeatherByCoordinates,
    fetchAllWeatherByCity,
  } = useWeather();

  const [dataKey, setDataKey] = useState<string>("temp");
  
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  if (error !== "") {
    alert(error);
    setError("");
  }

  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} bg-white grid grid-rows-[20px_1fr_20px] justify-items-center min-h-screen p-16 pb-20 gap-16 font-[family-name:var(--font-geist-sans)]`}
    >
      <main className="flex flex-col gap-6 row-start-2">
        <SearchBar onSearch={fetchAllWeatherByCity} />
        <Title level={1} underline>
          {toTitleCase(weatherData.city)}, {weatherData.cityCode}
        </Title>
        <Flex gap={15} justify="space-between">
          <DetailedCard
            date={formatDate(weatherData.date)}
            time={formatTime(weatherData.date)}
            weather={weatherData?.weather}
            weatherIcon={weatherData.weatherIcon}
            temperature={Math.round(weatherData?.temp)}
            feelsLike={Math.round(weatherData?.feelsLike)}
            description={weatherData?.description}
            windSpeed={weatherData?.windSpeed}
            pressure={weatherData?.pressure}
            humidity={weatherData?.humidity}
            clouds={weatherData?.clouds}
            visibility={weatherData?.visibility}
            handleReload={() => fetchWeatherByCoordinates(coordinates)}
          />
          <div className="h-full w-[250px] md:w-[350px] lg:w-[550px]">
            <LazyMap
              coord={{
                lat: coordinates.lat,
                lon: coordinates.lon,
              }}
              zoom={10}
            />
          </div>
        </Flex>
        <div style={{ width: "100%" }}>
          <Title level={4}>5 Day Forecast</Title>
          <Flex gap={20} align="start">
            {dayForecastData.map((forecast, index) => (
              <WeatherCard
                key={index}
                date={getDayFromEpoch(forecast.date)}
                day={getDayOfWeekFromEpoch(forecast.date).substring(0, 3)}
                weather={forecast.weather}
                weatherIcon={forecast.weatherIcon}
                temp={Math.round(forecast.temp)}
                minTemp={forecast.minTemp}
                maxTemp={forecast.maxTemp}
              />
            ))}
          </Flex>
        </div>
        <div style={{ width: "100%" }}>
          <Title level={4}>3 Hourly Forecast</Title>
          <Card bordered={false}>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={hourlyForecastData}>
                <Line type="monotone" dataKey={dataKey} stroke="#8884d8" />
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis
                  unit={
                    dataKey === "temp"
                      ? "°C"
                      : dataKey === "humidity"
                      ? "%"
                      : "m/s"
                  }
                />
                <Legend />
                <Tooltip />
              </LineChart>
            </ResponsiveContainer>
            <div style={{ marginTop: 20, textAlign: "center" }}>
              <Segmented
                options={[
                  { label: "Temperature", value: "temp" },
                  { label: "Humidity", value: "humidity" },
                  { label: "Wind", value: "wind" },
                ]}
                value={dataKey}
                onChange={setDataKey}
                style={{ width: 243 }}
              />
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
