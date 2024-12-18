import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

interface Coord {
  lat: number;
  lon: number;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const API_KEY = process.env.IPLOCATION_API_KEY;
  const BASE_URL = "https://api.ip2location.io";

  try {
    const response = await axios.get(BASE_URL, {
      params: {
        format: "json",
        key: API_KEY,
      },
    });

    const data = response.data;
    console.log(data);
    // Ensure the data is valid and contains the expected format
    if (data) {
      const coordinates: Coord = {
        lat: data.latitude,
        lon: data.longitude,
      };
      return res.status(200).json(coordinates);
    } else {
      return res.status(404).json({ error: "No data found" });
    }
  } catch (err) {
    console.error("Error fetching data from IPLocationAPI:", err);
    return res.status(500).json({ error: "Error fetching data" });
  }
}
