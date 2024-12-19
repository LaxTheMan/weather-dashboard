import axios from "axios";
import { GeocodingApiResponse } from "@/types/ResponseTypes";
import { Coord } from "@/types/LocationTypes";

const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY;
const BASE_URL = "https://api.openweathermap.org/geo/1.0";

export const getCoordinatesByCity = async (city: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/direct`, {
      params: {
        q: city,
        limit: 5,
        appid: API_KEY,
      },
    });
    return extractCoordinates(response.data);
  } catch (err) {
    console.log(err);
    throw new Error("Error fetching data from GeocodingAPI");
  }
};

const extractCoordinates = (data: GeocodingApiResponse): Coord => {
  return { lat: data[0].lat, lon: data[0].lon };
};
