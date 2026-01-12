import client from "@/tina/client";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const vals = await cookies();
  const branch = vals.get("x-branch")?.value;
  const body = await request.json();
  const { queryNames = [], args = [] } = body as {
    queryNames: string[];
    args: Array<{ relativePath: string }>;
  };

  for (let i = 0; i < queryNames.length; i++) {
    const tinaQuery = client.queries[queryNames[i]];
    if (!tinaQuery) {
      continue;
    }

    if (typeof tinaQuery !== "function") {
      return new Response(JSON.stringify({ error: "Query not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    try {
      const result = await tinaQuery(args[i], {
        fetchOptions: { headers: { "x-branch": branch || "main" } },
      });

      return new Response(
        JSON.stringify({
          queryIndex: i,
          ...result,
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    } catch (error) {
      continue;
    }
  }
  return new Response(JSON.stringify("Tina data not found"), {
    status: 404,
    headers: { "Content-Type": "application/json" },
  });
}
