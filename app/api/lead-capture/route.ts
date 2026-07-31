import { validateTurnstile } from "@/services/server/cloudflare-turnstile";
import { NextRequest } from "next/server";

/**
 * Receives lead-capture answers from the V3LeadCapture block, records them in
 * JotForm, and triggers the CRM flow.
 *
 * The endpoint is public and spends the JotForm API key plus fires the CRM
 * flow, so a valid Cloudflare Turnstile token is required first — otherwise it
 * can be scripted to spam leads into both JotForm and the CRM.
 *
 * Two steps, because JotForm's webhook (which drives the Power Automate → CRM
 * flow) only fires on real form submissions — not on API writes, and the form's
 * captcha blocks a server-side form submission. So we:
 *   1. write the lead to JotForm via the submissions API (lands in the table), and
 *   2. POST the lead straight to a Power Automate HTTP-trigger flow that does the
 *      CRM work, bypassing the form webhook entirely.
 *
 * Body: { lead: Record<fieldKey, value>, turnstileToken: string } with semantic
 * keys (name, email, …).
 */
const JOTFORM_ID = "233468468973070";

// Semantic lead keys → JotForm question ids for the submissions API.
const QID: Record<string, string> = {
  name: "16",
  email: "4",
  company: "7",
  phone: "17",
  location: "6",
  hearAboutUs: "8",
  message: "9",
  landingPageUrl: "20",
};

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.JOTFORM_API_KEY;
    if (!apiKey) {
      return Response.json(
        { message: "JotForm is not configured." },
        { status: 500 }
      );
    }

    const { lead, turnstileToken } = await request.json();
    if (!lead || typeof lead !== "object") {
      return Response.json({ message: "Missing lead." }, { status: 400 });
    }

    if (!turnstileToken) {
      return Response.json(
        { message: "Missing Turnstile token." },
        { status: 400 }
      );
    }

    const turnstile = await validateTurnstile(turnstileToken);
    if (!turnstile.success) {
      return Response.json(
        { message: "Turnstile verification failed." },
        { status: 403 }
      );
    }

    // 1. Record the lead in JotForm (lands in the table).
    const body = new URLSearchParams();
    for (const [key, qid] of Object.entries(QID)) {
      const value = lead[key];
      if (value != null && value !== "") {
        body.append(`submission[${qid}]`, String(value));
      }
    }

    const jf = await fetch(
      `https://api.jotform.com/form/${JOTFORM_ID}/submissions?apiKey=${encodeURIComponent(
        apiKey
      )}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      }
    );

    if (!jf.ok) {
      const detail = await jf.text();
      console.error("JotForm submission failed:", jf.status, detail);
      return Response.json(
        { message: "Failed to submit lead." },
        { status: 502 }
      );
    }

    // 2. Trigger the CRM flow directly. The lead is already saved, so a flow
    //    failure is logged but doesn't fail the user's submission.
    const flowUrl = process.env.POWER_AUTOMATE_LEAD_WEBHOOK_URL;
    if (flowUrl) {
      const flow = await fetch(flowUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead),
      });
      if (!flow.ok) {
        console.error(
          "Power Automate trigger failed:",
          flow.status,
          await flow.text()
        );
      }
    } else {
      console.warn(
        "POWER_AUTOMATE_LEAD_WEBHOOK_URL not set — CRM flow not triggered."
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
