import { hyphenateUrl } from "app/api/hyphenateUrl";
import { NextRequest } from "next/server";
import client from "../../../../tina/__generated__/client";
import { getEventsWithClient } from "../getEvents";

export async function GET(req: NextRequest) {
  let presenterName = req.nextUrl.searchParams.get("presenterName");
  if (presenterName) {
    presenterName = hyphenateUrl(presenterName);
  }
  let query = {
    fromDate: new Date().toISOString(),
    top: presenterName ? undefined : 10,
  };
  const eventClient = await client.queries.getFutureEventsQuery(query);
  const events = await getEventsWithClient(eventClient, presenterName);
  return new Response(JSON.stringify(events), { status: 200 });
}
