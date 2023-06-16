import { TinaCloudUser, isAuthorized } from "@tinacms/auth";
import formidable from "formidable";

import path from "path";
import { promises as fs } from "fs";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405);
  }
  const user: TinaCloudUser | undefined = await isAuthorized(req);

  if (process.env.NODE_ENV === "development" || (user && user.verified)) {
    await new Promise((resolve, reject) => {
      const form = new formidable.IncomingForm();
      form.uploadDir = "./public/uploads";
      form.keepExtensions = true;
    
      form.parse(req, async (err, fields, files) => {
        if (err) reject(err);
        else resolve({ fields, files });
      });
    });
    
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
