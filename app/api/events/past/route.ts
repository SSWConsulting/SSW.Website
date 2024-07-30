import { setAllowOriginIfTrusted } from "@/services/server/cors";
import { dehyphenateUrl } from "@/services/server/dehyphenateUrl";
import { getPastEvents } from "@/services/server/getEvents";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  let presenterName = req.nextUrl.searchParams.get("presenterName");
  const top = req.nextUrl.searchParams.get("top");
  if (presenterName) {
    presenterName = dehyphenateUrl(presenterName);
  }
  const events = await getPastEvents(top, presenterName);
  let responseHeaders = {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  };
  setAllowOriginIfTrusted(responseHeaders, req.nextUrl.origin);
  return new Response(JSON.stringify(events), responseHeaders);
}
