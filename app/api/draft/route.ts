import { draftMode } from "next/headers";

export async function GET() {
  draftMode().enable();
  return new Response("Draft mode enabled", {
    status: 200,
  });
}
