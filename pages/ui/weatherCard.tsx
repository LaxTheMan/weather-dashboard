import React from "react";
import { Card, Flex, Typography } from "antd";
import { SunOutlined } from "@ant-design/icons";
const { Title, Text } = Typography;

interface Forecast {
  day: string;
  date: string;
  weather: string;
  minTemp: number;
  maxTemp: number;
}

const forecastData: Forecast[] = [
  { day: "Wed", date: "18", weather: "Sunny", minTemp: 14, maxTemp: 28 },
  { day: "Thu", date: "19", weather: "Sunny", minTemp: 14, maxTemp: 28 },
  { day: "Fri", date: "20", weather: "Sunny", minTemp: 14, maxTemp: 28 },
  { day: "Sat", date: "21", weather: "Sunny", minTemp: 14, maxTemp: 28 },
  { day: "Sun", date: "22", weather: "Sunny", minTemp: 14, maxTemp: 28 },
];

export const WeatherCard = () => {
  return (
    <Card
      className="bg-offwhite text-center flex flex-col items-center"
      bordered={false}
    >
        <Title level={4}>
          {forecastData[0].date} {forecastData[0].day}
        </Title>
        <Flex gap="middle" align="center" vertical>

        <SunOutlined style={{ fontSize: "56px", color: "#FFD700" }} />
        <Text strong >{forecastData[0].weather}</Text>
        </Flex>
        <div>
          <Text strong>
            {forecastData[0].minTemp}° / {forecastData[0].maxTemp}°
          </Text>
        </div>
    </Card>
  );
};
