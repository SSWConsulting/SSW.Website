import { draftMode } from "next/headers";

export async function GET() {
  //TODO: ADD Tina Authentication
  draftMode().enable();
  return new Response("Draft mode enabled", {
    status: 200,
  });
}
