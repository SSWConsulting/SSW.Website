import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = await cookies();
  const branch = cookieStore.get("x-branch")?.value;
  return NextResponse.json({ branch });
}
