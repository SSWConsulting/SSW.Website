import { NextApiRequest, NextApiResponse } from "next";
import { validateToken } from "../../services";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === "POST") {
		const validition = await validateToken(req.body);
		res.status(validition.status).json(validition.data);
	} else {
		res.status(405).json({ message: "Unsupported method" });
	}
}
