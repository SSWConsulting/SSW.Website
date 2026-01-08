import client from "@/tina/client";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const vals = await cookies();
  const branch = vals.get("x-branch")?.value;
  console.log("branch", branch);
  console.log("Request was hit");

  const body = (await request.json()) as { query: string; variables: object };
  const { query, variables } = body;
  const tinaRes = await client.request(
    { query, variables },
    {
      fetchOptions: {
        headers: {
          "x-branch": branch,
        },
      },
    }
  );

  return new Response(JSON.stringify(tinaRes), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
