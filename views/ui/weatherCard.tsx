import React from "react";
import { Card, Flex, Image, Typography } from "antd";
const { Title, Text } = Typography;

export type WeatherCardProps = {
  date: number;
  day: string;
  weather: string;
  weatherIcon: string;
  temp: number;
};

export const WeatherCard = ({
  date,
  day,
  weather,
  weatherIcon,
  temp,
}: WeatherCardProps) => {
  return (
    <Card
      className="bg-offwhite text-center flex flex-col items-center h-full"
      bordered={false}
    >
      <Title level={4}>
        {date} {day}
      </Title>
      <Flex gap="middle" align="center" vertical>
        <Image
          preview={false}
          width={"100%"}
          src={`https://openweathermap.org/img/wn/${weatherIcon}@4x.png`}
          alt="Weather Image"
        />
        <Text strong>{weather}</Text>
      </Flex>
      <div>
        <Text strong>{temp}°</Text>
      </div>
    </Card>
  );
};
