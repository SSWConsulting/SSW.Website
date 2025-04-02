import { draftMode } from "next/headers";

export async function GET() {
  (await draftMode()).disable();
  return new Response("Draft mode disabled", {
    status: 200,
  });
}
