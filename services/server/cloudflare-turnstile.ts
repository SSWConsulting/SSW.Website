type TurnstileResult = { success: boolean; "error-codes"?: string[] };

/**
 * Verifies a Cloudflare Turnstile token server-side via the siteverify API.
 * https://developers.cloudflare.com/turnstile/get-started/server-side-validation/
 */
export const validateTurnstile = async (
  token: string
): Promise<TurnstileResult> => {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  // Missing secret fails closed, but log it: otherwise an unprovisioned server
  // rejects every legit user with the same 403 a real bot gets, silently.
  if (!secret) {
    console.error("TURNSTILE_SECRET_KEY not set — rejecting submission.");
    return { success: false };
  }

  const res = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ secret, response: token }),
    }
  );

  if (!res.ok) {
    console.error("Turnstile siteverify HTTP error:", res.status);
    return { success: false };
  }

  return (await res.json()) as TurnstileResult;
};
