import client from "@/tina/client";
import * as appInsights from "applicationinsights";
import { notFound } from "next/navigation";
import { NextRequest } from "next/server";
// import { cache } from "services/server/cacheService";
// import megaMenuJson from "../../../../../content/megamenu/menu.json";




export async function GET(request: NextRequest<{query: string}>, { params }: { params: MyParams }) {

  request.body

  client.request(variables: )
  const { branch, collection, path } = await params;

  const query = client.queries[collection];

  if (!query) {
    return notFound();
  }
  try {
    var response = await query({
      relativePath: path,
      fetchOptions: {
        headers: {
          "x-branch": branch,
        },
      },
    });
  } catch (error) {
    return notFound();
  }

  return Response.json(response);
}
