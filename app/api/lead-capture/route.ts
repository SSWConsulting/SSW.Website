import { NextRequest } from "next/server";

/**
 * Receives lead-capture answers from the V3LeadCapture block and submits them
 * to JotForm through the form's public submit endpoint.
 *
 * We deliberately do NOT use the JotForm submissions API: API-created entries
 * skip the form's integrations, so the webhook / Flow (and the downstream CRM
 * automation it drives) never fires. Posting to the submit endpoint is a real
 * submission, so every integration runs exactly as it would for the hosted form.
 * As a bonus, the submit endpoint is public, so no server-side API key is needed.
 *
 * Body: { jotFormId: string, fields: Record<inputName, value> }
 * Each `fields` key is the JotForm input name (e.g. "q6_typeA").
 */
export async function POST(request: NextRequest) {
  try {
    const { jotFormId, fields } = await request.json();

    if (!jotFormId || !fields || typeof fields !== "object") {
      return Response.json(
        { message: "Missing jotFormId or fields." },
        { status: 400 }
      );
    }

    const body = new URLSearchParams();
    body.append("formID", String(jotFormId));
    for (const [name, value] of Object.entries(fields)) {
      if (value != null && value !== "") {
        body.append(name, String(value));
      }
    }

    const res = await fetch(
      `https://submit.jotform.com/submit/${encodeURIComponent(jotFormId)}`,
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
