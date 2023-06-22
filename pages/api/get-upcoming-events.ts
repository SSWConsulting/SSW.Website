import * as msal from "@azure/msal-node";
import { BearerToken } from "@pnp/queryable";
import { spfi } from "@pnp/sp";
import { NextApiRequest, NextApiResponse } from "next";

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

    // const odataFilter = `$filter=Enabled ne false \
    //   and EndDateTime gt datetime'${datetimeParam}'\
    //   &$orderby=StartDateTime asc\
    //   &$top=${topCountParam}`;

    // const upcomingEventsRes: { status: number, data: EventInfo[] } = await getUpcomingEvents(
    //   <string>datetimeParam,
    //   topCountParam
    // );

    // const authRes = await fetch(
    //   `https://login.microsoft.com/${process.env.MICROSOFT_OAUTH_TENANT_ID}/oauth2/v2.0/token`,
    //   {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/x-www-form-urlencoded",
    //     },
    //     body: new URLSearchParams({
    //       client_id: process.env.MICROSOFT_OAUTH_CLIENT_ID,
    //       scope: "https://sswcom.sharepoint.com/Sites.Read.All",
    //       client_secret: process.env.MICROSOFT_OAUTH_CLIENT_SECRET,
    //       grant_type: "client_credentials",
    //     }),
    //   }
    // );

    const clientConfig = {
      auth: {
        clientId: process.env.MICROSOFT_OAUTH_CLIENT_ID,
        authority: `https://login.microsoftonline.com/${process.env.MICROSOFT_OAUTH_TENANT_ID}`,
        clientSecret: process.env.MICROSOFT_OAUTH_CLIENT_SECRET,
      },
    };

    const clientApp = new msal.ConfidentialClientApplication(clientConfig);

    try {
      const authParams = {
        scopes: ["https://sswcom.sharepoint.com/.default"],
      };

      const authRes = await clientApp.acquireTokenByClientCredential(
        authParams
      );

      const sp = await spfi("https://sswcom.sharepoint.com/sites/Events").using(
        BearerToken(authRes.accessToken)
      );

      //const eventsList = await sp.get().lists.getByTitle("Events").items.get();
      console.log(authRes);

      // const eventsListRes = await fetch(
      //   "https://sswcom.sharepoint.com/sites/Events/_api/web/lists/getbytitle('Events')/items",
      //   {
      //     headers: {
      //       Authorization: "Bearer " + "authRes.accessToken",
      //       Accept: "application/json;odata=nometadata",
      //     },
      //   }
      // );

      // console.log(await eventsListRes.json());
      // const eventsList = await eventsListRes.json();
      res.status(200).send(authRes);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: true });
    }
  } else {
    res.status(405).json({ message: "Unsupported method" });
  }
}
