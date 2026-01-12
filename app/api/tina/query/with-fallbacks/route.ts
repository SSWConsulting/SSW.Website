import client from "@/tina/client";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const vals = await cookies();
  const branch = vals.get("x-branch")?.value;
  const body = await request.json();
  const { queryNames = [], args = [] } = body as {
    queryNames: string[];
    args: Array<Record<string, unknown>>;
  };

  for (let i = 0; i < queryNames.length; i++) {
    const tinaQuery =
      client.queries[queryNames[i] as keyof typeof client.queries];
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
      console.log("attempting query");
      const arg2 = [
        args[i],
        { fetchOptions: { headers: { "x-branch": branch || "main" } } },
      ];

      //@ts-ignore
      const result = await tinaQuery(...arg2);

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
      console.log("error", error);
      console.log("catch was thrown");
    }
  }
  return new Response(JSON.stringify("Tina data not found"), {
    status: 400,
    headers: { "Content-Type": "application/json" },
  });
}
