import { hyphenateUrl } from "app/api/hyphenateUrl";
import { NextRequest } from "next/server";
import client from "../../../../tina/__generated__/client";
import { getEventsWithClient } from "../getEvents";

export async function GET(req: NextRequest) {
  let presenterName = req.nextUrl.searchParams.get("presenterName");
  const top = req.nextUrl.searchParams.get("top");
  if (presenterName) {
    presenterName = hyphenateUrl(presenterName);
  }
  /* if a presenter name is provided we leave topArg as undefined to retrieve the maximum number of events
    This is because we're filtering events on our back end*/
  const eventClient = await client.queries.getFutureEventsQuery(
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

export const getParams = (
  top: string | undefined,
  presenterName: string | undefined
) => {
  let topArg = 999;
  if (top && !presenterName) {
    topArg = parseInt(top);
  } else if (!top && !presenterName) {
    topArg = 10;
  }
  // return the first 10 results if no presenter name is provided and no top argurment is provided
  const queryArgs = {
    fromDate: new Date().toISOString(),
    top: topArg,
  };
  return queryArgs;
};
