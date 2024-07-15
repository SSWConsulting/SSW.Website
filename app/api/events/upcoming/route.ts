import { NextRequest } from "next/server";
import client from "../../../../tina/__generated__/client";
import { getEventsWithClient } from "../formatEvent";

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get("presenterName");
  if (!query) return new Response("presenterName is required", { status: 400 });
  const eventClient = await client.queries.getFutureEventsQuery({
    fromDate: new Date().toISOString(),
    top: 10,
    presenterName: query,
  });
  const events = await getEventsWithClient(eventClient);
  return new Response(JSON.stringify(events), { status: 200 });
}
