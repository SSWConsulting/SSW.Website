import { hyphenateUrl } from "app/api/hyphenateUrl";
import { NextRequest } from "next/server";
import client from "../../../../tina/__generated__/client";
import { getEventsWithClient } from "../getEvents";
import { getParams } from "../upcoming/route";

export async function GET(req: NextRequest) {
  let presenterName = req.nextUrl.searchParams.get("presenterName");
  const top = req.nextUrl.searchParams.get("top");
  if (presenterName) {
    presenterName = hyphenateUrl(presenterName);
  }
  const eventClient = await client.queries.getPastEventsQuery(
    getParams(top, presenterName)
  );
  const events = await getEventsWithClient(eventClient, presenterName, top);
  return new Response(JSON.stringify(events), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
