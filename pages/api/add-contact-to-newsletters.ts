import { NextApiRequest, NextApiResponse } from "next";
import { AddContactToNewslettersData } from "../../services";
import axios from "axios";

export const addContactToNewsletters = async (
  data: AddContactToNewslettersData
) =>
  await axios.post(
    "https://prod-25.australiasoutheast.logic.azure.com:443/workflows/f2aabcc6c95e4a43a2002fe6b3b6103c/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=rk7o9zjStbS_FPJqEQfd8UTpqaw-QT4hOFR5BPKnENU",
    data,
    {
      headers: { "Content-Type": "application/json" },
    }
  );

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "POST") {
      const addContactToNewsLettersRes = await addContactToNewsletters(
        req.body
      );
      res
        .status(addContactToNewsLettersRes.status)
        .json(addContactToNewsLettersRes.data);
    } else {
      res.status(405).json({ message: "Unsupported method" });
    }
  } catch (error) {
    res
      .status(error.response.status)
      .json({ message: error.response.data.message });
  }
}
