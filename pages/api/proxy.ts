import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { object, string } from "yup";
import { proxiedWhitelist } from "../../components/util/constants/partytown";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    let { url } = req.query;

    if (!url) {
      return res.status(400).json({ message: "URL parameter is required" });
    }

    const parsedUrl = decodeURIComponent(url as string);

    const proxySchema = object({
      url: string().required().url(),
    });

    const proxyReq = await proxySchema.validate(
      { url: parsedUrl },
      { strict: true }
    );

    url = proxyReq.url;

    const urlObj = new URL(url);
    if (!proxiedWhitelist.includes(urlObj.hostname)) {
      return res.status(400).json({
        message: "URL is not in the whitelist",
      });
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
