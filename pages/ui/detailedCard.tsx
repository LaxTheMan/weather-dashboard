import React from "react";
import { Card, Row, Col, Typography, Button, Image } from "antd";
import { ReloadOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

type DetailedCardProps = {
  date: string;
  time: string;
  weather: string;
  weatherIcon: string;
  temperature: number;
  feelsLike: number;
  description: string;
  windSpeed: number;
  pressure: number;
  humidity: number;
  dewPoint: number;
  visibility: number;
  handleReload: () => void;
};

const DetailedCard= ({
  date,
  time,
  weather,
  weatherIcon,
  temperature,
  feelsLike,
  description,
  windSpeed,
  pressure,
  humidity,
  dewPoint,
  visibility,
  handleReload,
}: DetailedCardProps) => {
  return (
    <Card style={{ width: 350, borderRadius: 8 }}>
      <Row justify="space-between">
        <Text style={{ color: "#ff7a45", fontWeight: "bold" }}>
          {date}, {time}
        </Text>
        <Button
          onClick={handleReload}
          shape="circle"
          size="small"
          icon={<ReloadOutlined />}
        />
      </Row>
      <Row justify="space-between" align="middle" style={{ marginTop: 8 }}>
        <Col>
          <Title level={2} style={{ margin: 0 }}>
            {weather}
          </Title>
          <Text style={{ fontSize: 24 }}>{temperature}°C</Text>
        </Col>
        <Col>
          {weatherIcon === "" ? (
            <Image
              preview={false}
              width={80}
              src={`https://openweathermap.org/img/wn/01d@4x.png`}
              alt="Weather Image"
            />
          ) : (
            <Image
              preview={false}
              width={80}
              src={`https://openweathermap.org/img/wn/${weatherIcon}@4x.png`}
              alt="Weather Image"
            />
          )}
        </Col>
      </Row>
      <Text strong>
        Feels like {feelsLike}°C. Expect {description}.
      </Text>
      <Row gutter={[16, 8]} style={{ marginTop: 16 }}>
        <Col span={12}>
          <Text>Wind Speed: {windSpeed}m/s</Text>
        </Col>
        <Col span={12}>
          <Text>Pressure: {pressure}hPa</Text>
        </Col>
        <Col span={12}>
          <Text>Humidity: {humidity}%</Text>
        </Col>
        <Col span={12}>
          <Text>Dew Point: {dewPoint}</Text>
        </Col>
        <Col span={12}>
          <Text>Visibility: {visibility / 1000}Km</Text>
        </Col>
      </Row>
    </Card>
  );
};

export default DetailedCard;
