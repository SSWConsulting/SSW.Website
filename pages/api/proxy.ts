// pages/api/proxy.js
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { url } = req.query;

    if (!url) {
      return res.status(400).json({ message: "URL parameter is required" });
    }

    const response = await axios.get(url.toString(), {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET",
      },
    });

    res.status(response.status).json(response.data);
  } catch (error) {
    console.error("Proxy error:", error);
    res
      .status(500)
      .json({ message: "An error occurred while proxying the request" });
  }
};
