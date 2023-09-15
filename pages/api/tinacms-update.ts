import { NextApiRequest, NextApiResponse } from "next";

import { Octokit } from "@octokit/core";

const octokit = new Octokit({
  auth: process.env.GITHUB_PERSONAL_ACCESS_TOKEN,
});

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // if (!user) {
  //   res.status(401).json({ error: "Unauthorized" });
  //   return;
  // }

  res.status(200).json({ hello: "world" });
}
