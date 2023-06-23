import * as msal from "@azure/msal-node";
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

    const odataFilter =
      "$filter=fields/Enabled ne false\
      &$orderby=fields/StartDateTime desc\
      &$top=10";

    // const upcomingEventsRes: { status: number, data: EventInfo[] } = await getUpcomingEvents(
    //   <string>datetimeParam,
    //   topCountParam
    // );

    const siteId =
      "sswcom.sharepoint.com,8b375f80-d2e4-42a5-9ed3-54a3cfeb61b5,732990a3-6822-4895-b68a-3653da9f5910";
    const listId = "5502e86d-ad16-4eb4-a41c-ac33c9a08382";

    const token = await getToken();
    const eventsRes = await fetch(
      `https://graph.microsoft.com/v1.0/sites/${siteId}/lists/${listId}/items?expand=fields&${odataFilter}`,
      {
        headers: {
          Authorization: "Bearer " + token,
          Accept: "application/json",
          Prefer: "HonorNonIndexedQueriesWarningMayFailRandomly",
        },
      }
    );

    const eventBody = await eventsRes.json();

    res.status(200).send(eventBody);

    // try {
    //   const authParams = {
    //     scopes: ["https://sswcom.sharepoint.com/.default"],
    //   };

    //   const authRes = await clientApp.acquireTokenByClientCredential(
    //     authParams
    //   );

    //   const sp = await spfi("https://sswcom.sharepoint.com/sites/Events").using(
    //     BearerToken(authRes.accessToken)
    //   );

    //   //const eventsList = await sp.get().lists.getByTitle("Events").items.get();

    //   // const eventsListRes = await fetch(
    //   //   "https://sswcom.sharepoint.com/sites/Events/_api/web/lists/getbytitle('Events')/items",
    //   //   {
    //   //     headers: {
    //   //       Authorization: "Bearer " + "authRes.accessToken",
    //   //       Accept: "application/json;odata=nometadata",
    //   //     },
    //   //   }
    //   // );

    //   // console.log(await eventsListRes.json());
    //   // const eventsList = await eventsListRes.json();
    //   res.status(200).send(authRes);
    // } catch (error) {
    //   console.error(error);
    //   res.status(500).json({ error: true });
    // }
  } else {
    res.status(405).json({ message: "Unsupported method" });
  }
}

const getToken = async () => {
  const clientConfig = {
    auth: {
      clientId: process.env.MICROSOFT_OAUTH_CLIENT_ID,
      authority: `https://login.microsoftonline.com/${process.env.MICROSOFT_OAUTH_TENANT_ID}`,
      clientSecret: process.env.MICROSOFT_OAUTH_CLIENT_SECRET,
    },
  };

  const clientApp = new msal.ConfidentialClientApplication(clientConfig);

  const authParams = {
    scopes: ["https://graph.microsoft.com/.default"],
  };

  const authRes = await clientApp.acquireTokenByClientCredential(authParams);

  return authRes?.accessToken;
};
