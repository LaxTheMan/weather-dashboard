import React from "react";
import { Card, Flex, Image, Typography } from "antd";
const { Title, Text } = Typography;

export type WeatherCardProps = {
  date: number;
  day: string;
  weather: string;
  weatherIcon: string;
  temp: number;
  minTemp: number;
  maxTemp: number;
};

export const WeatherCard = ({
  date,
  day,
  weather,
  weatherIcon,
  temp,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  minTemp,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  maxTemp,
}: WeatherCardProps) => {
  return (
    <Card
      className="bg-offwhite w-32 text-center flex flex-col items-center"
      bordered={false}
    >
      <Title level={4}>
        {date} {day}
      </Title>
      <Flex gap="middle" align="center" vertical>
        <Image
          preview={false}
          width={50}
          src={`https://openweathermap.org/img/wn/${weatherIcon}@4x.png`}
          alt="Weather Image"
        />
        {/* <SunOutlined style={{ fontSize: "56px", color: "#FFD700" }} /> */}
        <Text strong>{weather}</Text>
      </Flex>
      <div>
        <Text strong>
          {/* {minTemp}° / {maxTemp}° */}
          {temp}°
        </Text>
      </div>
    </Card>
  );
};
