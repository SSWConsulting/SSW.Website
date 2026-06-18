import { NextRequest } from "next/server";

/**
 * Receives lead-capture answers from the V3LeadCapture block and forwards them
 * to JotForm's submissions API, keeping the API key server-side.
 *
 * Body: { jotFormId: string, fields: Record<qid, value> }
 * Each `fields` key is a JotForm question id (qid); JotForm expects them encoded
 * as `submission[{qid}]=value`.
 */
export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.JOTFORM_API_KEY;
    if (!apiKey) {
      return Response.json(
        { message: "JotForm is not configured." },
        { status: 500 }
      );
    }

    const { jotFormId, fields } = await request.json();

    if (!jotFormId || !fields || typeof fields !== "object") {
      return Response.json(
        { message: "Missing jotFormId or fields." },
        { status: 400 }
      );
    }

    const body = new URLSearchParams();
    for (const [qid, value] of Object.entries(fields)) {
      if (value != null && value !== "") {
        body.append(`submission[${qid}]`, String(value));
      }
    }

    const res = await fetch(
      `https://api.jotform.com/form/${encodeURIComponent(
        jotFormId
      )}/submissions?apiKey=${encodeURIComponent(apiKey)}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      }
    );

    if (!res.ok) {
      const detail = await res.text();
      console.error("JotForm submission failed:", res.status, detail);
      return Response.json(
        { message: "Failed to submit lead." },
        { status: 502 }
      );
    }

    return Response.json({ ok: true }, { status: 200 });
  } catch (error) {
    console.error("lead-capture error:", error);
    return Response.json({ message: "Unexpected error." }, { status: 500 });
  }
}

export async function GET() {
  return Response.json({ message: "Unsupported method" }, { status: 405 });
}
