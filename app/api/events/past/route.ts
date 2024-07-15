import { hyphenateUrl } from "app/api/hyphenateUrl";
import { NextRequest } from "next/server";
import client from "../../../../tina/__generated__/client";
import { getEventsWithClient } from "../getEvents";

export async function GET(req: NextRequest) {
  let presenterName = req.nextUrl.searchParams.get("presenterName");
  if (!presenterName) {
    return new Response("presenterName is required", { status: 400 });
  }
  
  presenterName = hyphenateUrl(presenterName);
  const eventClient = await client.queries.getPastEventsQuery({
    fromDate: new Date().toISOString(),
    top: 999 /* GraphQL will limit the count to 50 by default, 
    but were doing the filtering outside of the query because GraphQL has no "like" filter
    https://tina.io/docs/graphql/queries/advanced/filter-documents/#operator-types
    */,
  });
  const events = await getEventsWithClient(eventClient, presenterName);
  return new Response(JSON.stringify(events), { status: 200 });
}
