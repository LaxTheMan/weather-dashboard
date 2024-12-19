export type Weather = {
  date: number;
  city: string;
  cityCode: string;
  weather: string;
  weatherIcon: string;
  temp: number;
  feelsLike: number;
  description: string;
  windSpeed: number;
  pressure: number;
  humidity: number;
  clouds: number;
  visibility: number;
};

export type DayForecast = {
  date: number;
  weather: string;
  weatherIcon: string;
  temp: number;
  minTemp: number;
  maxTemp: number;
};

export type HourForecast = {
  date: string;
  temp: number;
  humidity: number;
  wind: number;
};
