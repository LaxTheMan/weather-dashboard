import localFont from "next/font/local";
import { SearchBar } from "./ui/search";
import { WeatherCard } from "./ui/weatherCard";
import { Card, Flex } from "antd";
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from "recharts";

import Title from "antd/es/typography/Title";
import React from "react";
import DetailedCard from "./ui/detailedCard";
import MapComponent from "./ui/map";

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
  const data = [
    { name: "Page A", uv: 400, pv: 2400, amt: 2400 },
    { name: "Page A", uv: 500, pv: 2400, amt: 2400 },
    { name: "Page A", uv: 600, pv: 2400, amt: 2400 },
  ];

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
            date={"abc"}
            time={"abc"}
            weather={"abc"}
            temperature={0}
            feelsLike={0}
            description={"like this"}
            windSpeed={"34"}
            pressure={"press"}
            humidity={"hum"}
            dewPoint={"dew"}
            visibility={"15"}
          />
          <MapComponent latitude={35.011665} longitude={135.768326} />
        </Flex>
        <div className="self-center">
          <Title level={4}>5 Day Forecast</Title>
          <Flex gap="middle" align="start">
            <WeatherCard />
            <WeatherCard />
            <WeatherCard />
            <WeatherCard />
            <WeatherCard />
          </Flex>
        </div>
        <div>
          <Title level={4}>Hourly Forecast</Title>
          <Card bordered={false}>
            <LineChart width={600} height={300} data={data}>
              <Line type="monotone" dataKey="uv" stroke="#8884d8" />
              <CartesianGrid stroke="#ccc" />
              <XAxis dataKey="name" />
              <YAxis />
            </LineChart>
          </Card>
        </div>
      </main>
    </div>
  );
}
