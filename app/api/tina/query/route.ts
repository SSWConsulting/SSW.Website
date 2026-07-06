import client from "@/tina/client";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const vals = await cookies();
  const branch = vals.get("x-branch")?.value;
  const body = await request.json();
  const { queryName, relativePath } = body as {
    relativePath?: string;
    queryName?: string;
  };

  if (!queryName || typeof queryName !== "string") {
    return new Response(
      JSON.stringify({ error: "Missing or invalid queryName" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  const tinaQuery = client.queries[queryName];
  if (typeof tinaQuery !== "function") {
    return new Response(JSON.stringify({ error: "Query not found" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }
  try {
    const result = await tinaQuery(
      { relativePath },
      { fetchOptions: { headers: { "x-branch": branch || "main" } } }
    );

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ error: "Document Not Found" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }
}
