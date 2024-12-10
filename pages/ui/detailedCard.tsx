import React from "react";
import { Card, Row, Col, Typography } from "antd";
import { CloudOutlined, SunOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

type DetailedCardProps = {
  date: string;
  time: string;
  weather: string;
  temperature: number;
  feelsLike: number;
  description: string;
  windSpeed: string;
  pressure: string;
  humidity: string;
  dewPoint: string;
  visibility: string;
};

const DetailedCard: React.FC<DetailedCardProps> = ({
  date,
  time,
  weather,
  temperature,
  feelsLike,
  description,
  windSpeed,
  pressure,
  humidity,
  dewPoint,
  visibility,
}) => {
  return (
    <Card style={{ width: 320, borderRadius: 8 }}>
      <Row justify="space-between">
        <Text style={{ color: "#ff7a45", fontWeight: "bold" }}>
          {date}, {time}
        </Text>
      </Row>
      <Row justify="space-between" align="middle" style={{ marginTop: 8 }}>
        <Col>
          <Title level={2} style={{ margin: 0 }}>
            {weather}
          </Title>
          <Text style={{ fontSize: 24 }}>{temperature}°C</Text>
        </Col>
        <Col>
          {weather.toLowerCase() === "rainy" ? (
            <CloudOutlined style={{ fontSize: 48, color: "#1890ff" }} />
          ) : (
            <SunOutlined style={{ fontSize: 48, color: "#faad14" }} />
          )}
        </Col>
      </Row>
      <Text>
        Feels like {feelsLike}°C. {description}.
      </Text>
      <Row gutter={[16, 8]} style={{ marginTop: 16 }}>
        <Col span={12}>
          <Text>Wind Speed: {windSpeed}</Text>
        </Col>
        <Col span={12}>
          <Text>Pressure: {pressure}</Text>
        </Col>
        <Col span={12}>
          <Text>Humidity: {humidity}</Text>
        </Col>
        <Col span={12}>
          <Text>Dew Point: {dewPoint}</Text>
        </Col>
        <Col span={12}>
          <Text>Visibility: {visibility}</Text>
        </Col>
      </Row>
    </Card>
  );
};

export default DetailedCard;
