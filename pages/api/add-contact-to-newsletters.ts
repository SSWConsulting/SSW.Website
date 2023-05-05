import { NextApiRequest, NextApiResponse } from "next";
import { addContactToNewsletters } from "../../services";

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
