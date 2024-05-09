import { draftMode } from "next/headers";

export async function GET() {
  draftMode().disable();
  return new Response("Draft mode disabled", {
    status: 200,
  });
}
