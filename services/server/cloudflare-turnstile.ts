/**
 * Verifies a Cloudflare Turnstile token server-side via the siteverify API.
 * https://developers.cloudflare.com/turnstile/get-started/server-side-validation/
 */
export const validateTurnstile = async (token: string) => {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return { success: false };

  const res = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ secret, response: token }),
    }
  );

  return (await res.json()) as { success: boolean; "error-codes"?: string[] };
};
