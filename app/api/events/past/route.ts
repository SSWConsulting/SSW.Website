import { NextRequest } from "next/server";
import client from "../../../../tina/__generated__/client";
import { getEventsWithClient } from "../getEvents";

export async function GET(req: NextRequest) {
  const presenterName = req.nextUrl.searchParams.get("presenterName");
  if (!presenterName)
    return new Response("presenterName is required", { status: 400 });
  const eventClient = await client.queries.getPastEventsQuery({
    fromDate: new Date().toISOString(),
    top: 999, // GraphQL will limit the count to 50 by default, but were client side filtering 600 + events
  });
  const events = await getEventsWithClient(eventClient, presenterName);
  return new Response(JSON.stringify(events), { status: 200 });
}
