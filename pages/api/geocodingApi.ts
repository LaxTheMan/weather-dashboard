import axios from "axios";
import { Coord } from "../hooks/useWeather";

const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY;
const BASE_URL = "http://api.openweathermap.org/geo/1.0";

type GeocodingApiResponse = {
  name: string;
  lat: number;
  lon: number;
  country: string;
}[];

export const getCoordinatesByCity = async (city: string) => {
  const response = await axios.get(`${BASE_URL}/direct`, {
    params: {
      q: city,
      limit: 5,
      appid: API_KEY,
    },
  });
  return extractCoordinates(response.data);
};

const extractCoordinates = (data: GeocodingApiResponse): Coord => {
  return { lat: data[0].lat, lon: data[0].lon };
};
