import { NextApiRequest, NextApiResponse } from "next";
import { AddContactToNewslettersData } from "../../services";
import axios from "axios";

export const addContactToNewsletters = async (
  data: AddContactToNewslettersData
) =>
  await axios.post(process.env.NEWSLETTERS_ENDPOINT, data, {
    headers: { "Content-Type": "application/json" },
  });

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
