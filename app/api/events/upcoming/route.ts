import { getUpcomingEvents } from "@/services/server/getEvents";
import { hyphenateUrl } from "app/api/hyphenateUrl";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  let presenterName = req.nextUrl.searchParams.get("presenterName");
  const top = req.nextUrl.searchParams.get("top");
  if (presenterName) {
    presenterName = hyphenateUrl(presenterName);
  }
  const events = await getUpcomingEvents(top, presenterName);
  return new Response(JSON.stringify(events), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
