import client from "@/tina/client";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const vals = await cookies();
  const branch = vals.get("x-branch")?.value;
  const body = await request.json();
  const { queryName, args = [] } = body;

  if (!queryName || typeof queryName !== "string") {
    return new Response(
      JSON.stringify({ error: "Missing or invalid queryName" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  const tinaQuery = client.queries[queryName as keyof typeof client.queries];
  if (typeof tinaQuery !== "function") {
    return new Response(JSON.stringify({ error: "Query not found" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    //@ts-ignore
    const arg2 = [
      ...args,
      { fetchOptions: { headers: { "x-branch": branch || "main" } } },
    ];

    //@ts-ignore
    const result = await tinaQuery(...arg2);
    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error?.message || "Query failed" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
