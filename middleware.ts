import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import logger from "./services/global/logger";

export default async function middleware(request: NextRequest) {
  const hostname = new URL(request.url).hostname;
  if (hostname !== "ssw.com.au" && logger.level !== "info") {
    logger.level = "info";
  }
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
// export const config = {
//   matcher: "/about/:path*",
// };
