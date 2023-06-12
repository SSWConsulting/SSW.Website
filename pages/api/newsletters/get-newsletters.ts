import path from "path";
import { promises as fs } from "fs";

export default async function handler(req, res) {
  const newslettersDirectory = path.join(process.cwd(), "public/newsletters");
}
