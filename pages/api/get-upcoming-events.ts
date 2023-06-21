import { NextApiRequest, NextApiResponse } from "next";
import { EventInfo, getUpcomingEvents } from "../../services";
import { SPDefault } from "@pnp/nodejs";
import { sp } from "@pnp/sp/presets/all"; 

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    // const datetimeParam = req.query["datetime"];
    // const topCountParam = +req.query["top"];
    // if (typeof datetimeParam !== "string" || !topCountParam) {
    //   res.status(401).json({ message: "Unsupported query param" });
    // }

    // const upcomingEventsRes: { status: number, data: EventInfo[] } = await getUpcomingEvents(
    //   <string>datetimeParam,
    //   topCountParam
    // );

    // const odataFilter = `$filter=Enabled ne false \
    //   and EndDateTime gt datetime'${datetimeParam}'\
    //   &$orderby=StartDateTime asc\
    //   &$top=${topCountParam}`;

    // const siteUrl = "https://sswcom.sharepoint.com/";
    
    // const eventsListRes = await fetch(`${siteUrl}sites/Events/_api/web/lists/getbytitle('Events')/items`, {
    //   headers: {
    //     Authorization: "Bearer " + process.env.SPO_ACCESS_TOKEN,
    //     Accept: "application/json;odata=nometadata",
    //   }
    // });
    // const eventsList = await eventsListRes.json();
    // console.log(eventsList);
    

    // res.status(upcomingEventsRes.status).json(upcomingEventsRes.data);

    fetch(`https://login.microsoft.com/${process.env.MICROSOFT_OAUTH_TENANT_ID}/oauth2/v2.0/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        'client_id': process.env.MICROSOFT_OAUTH_CLIENT_ID,
        'scope': 'https://graph.microsoft.com/.default',
        'client_secret': process.env.MICROSOFT_OAUTH_CLIENT_SECRET,
        'grant_type': 'client_credentials'
      })
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error)); 

    
    res.status(200).json({});
  } else {
    res.status(405).json({ message: "Unsupported method" });
  }
}
