/* eslint-disable react-hooks/exhaustive-deps */
import { Card, Flex, notification, Segmented, Spin } from "antd";
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
import DetailedCard from "@/components/ui/DetailedCard";

import {
  formatDate,
  formatTime,
  getDayFromEpoch,
  getDayOfWeekFromEpoch,
} from "@/utils/date";
import { toTitleCase } from "@/utils/misc";
import { LazyMap } from "@/components/map/MapComponent";
import { useWeather } from "@/hooks/useWeather";
import { WEATHER_SEGMENTED_OPTIONS } from "@/constants/common";
import { geistMono, geistSans } from "@/utils/font";
import { SearchBar } from "@/components/ui/Search";
import { WeatherCard } from "@/components/ui/WeatherCard";

export default function Home() {
  const {
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
    fetchWeatherByCoordinates,
    fetchAllWeatherByCity,
  } = useWeather();

  const [dataKey, setDataKey] = useState<string>("temp");

  useEffect(() => {
    fetchInitialLocation();
  }, []);

  useEffect(() => {
    if (coordinates.lat !== 0 && coordinates.lon !== 0) {
      fetchWeatherByCoordinates(coordinates);
      fetchDailyForecastByCoordinates(coordinates);
      fetchHourlyForecastByCoordinates(coordinates);
    }
  }, [coordinates]);

  useEffect(() => {
    if (error) {
      // Show the error notification when error state changes
      notification.error({
        message: "Error",
        description: error,
        onClose: () => setError(""), // Reset error when the notification is closed
      });
    }
  }, [error, setError]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
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
                options={WEATHER_SEGMENTED_OPTIONS}
                value={dataKey}
                onChange={setDataKey}
              />
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
