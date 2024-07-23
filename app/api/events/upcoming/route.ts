import { dehyphenateUrl } from "@/services/server/dehyphenateUrl";
import { getUpcomingEvents } from "@/services/server/getEvents";

import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  let presenterName = req.nextUrl.searchParams.get("presenterName");
  const top = req.nextUrl.searchParams.get("top");
  if (presenterName) {
    presenterName = dehyphenateUrl(presenterName);
  }
  const events = await getUpcomingEvents(top, presenterName);
  return new Response(JSON.stringify(events), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
