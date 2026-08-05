"use client";

import { SSWAdaptiveField } from "@/components/ssw/field";
import { Field, FieldLabel } from "@/components/ui/field";
import { cn } from "@/lib/utils";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import { useRef, useState } from "react";
import { TiArrowLeft } from "react-icons/ti";

const HEAR_ABOUT_OPTIONS = [
  "Conference",
  "Google",
  "Government Suppliers List",
  "Repeat Business",
  "Events",
  "Referral",
  "Signage",
  "SSW TV",
  "Other",
];

// Location: countries, with Australia revealing state sub-options.
const LOCATIONS: { label: string; states: string[] }[] = [
  {
    label: "Australia",
    states: ["ACT", "NSW", "NT", "QLD", "SA", "TAS", "VIC", "WA"],
  },
  { label: "China", states: [] },
  { label: "Europe", states: [] },
  { label: "USA", states: [] },
];

// The UI keeps the short state codes; JotForm receives the full state name.
const AU_STATE_NAMES: Record<string, string> = {
  ACT: "Australian Capital Territory",
  NSW: "New South Wales",
  NT: "Northern Territory",
  QLD: "Queensland",
  SA: "South Australia",
  TAS: "Tasmania",
  VIC: "Victoria",
  WA: "Western Australia",
};

const TOTAL_SCREENS = 3;
const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

const primaryButtonClass =
  "rounded-lg bg-sswRed px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50";

const backButtonClass =
  "inline-flex items-center gap-2 text-xs text-gray-400 transition-colors hover:text-white";

type SubmitState = "idle" | "submitting" | "success" | "error";

type LeadCaptureFormProps = {
  /** Second line of the success screen, under "Thanks — we've got it." */
  successMessage?: string;
};

export function LeadCaptureForm({
  successMessage = "A senior consultant will be in touch with you shortly.",
}: LeadCaptureFormProps) {
  const [current, setCurrent] = useState(0);
  const [status, setStatus] = useState<SubmitState>("idle");

  // Screen 1 — your details
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  // Screen 2 — location + how you heard
  const [country, setCountry] = useState("");
  const [region, setRegion] = useState("");
  const [hearAboutUs, setHearAboutUs] = useState("");
  // Screen 3 — how can we help
  const [message, setMessage] = useState("");
  const [captchaToken, setCaptchaToken] = useState("");
  const [captchaError, setCaptchaError] = useState(false);
  const turnstileRef = useRef<TurnstileInstance>(null);

  const progress = Math.round(((current + 1) / TOTAL_SCREENS) * 100);
  const goBack = () => setCurrent((c) => Math.max(c - 1, 0));
  // Turnstile tokens are single-use; a submit that reaches siteverify consumes
  // it, so clear and re-issue one before any retry.
  const resetCaptcha = () => {
    setCaptchaToken("");
    turnstileRef.current?.reset();
  };
  const goNext = () => setCurrent((c) => Math.min(c + 1, TOTAL_SCREENS - 1));

  const selectedCountry = LOCATIONS.find((l) => l.label === country);
  const needsRegion = (selectedCountry?.states.length ?? 0) > 0;
  // JotForm's location widget stores a newline-separated string and renders
  // each line as its own tag (e.g. "Australia\nNew South Wales" → two tags).
  // Submitting a real array instead crashes its submission viewer with
  // "items.map is not a function".
  const regionName =
    needsRegion && region ? (AU_STATE_NAMES[region] ?? region) : "";
  const locationValue = regionName ? `${country}\n${regionName}` : country;

  const screen1Valid =
    name.trim().length > 0 &&
    /.+@.+\..+/.test(email.trim()) &&
    company.trim().length > 0 &&
    phone.trim().length > 0;

  const screen2Valid = Boolean(country) && (!needsRegion || Boolean(region));

  const screen3Valid = message.trim().length > 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "submitting") return;
    setStatus("submitting");

    const lead: Record<string, string> = {
      name: name.trim(),
      email: email.trim(),
      company: company.trim(),
      phone: phone.trim(),
      location: locationValue,
      message: message.trim(),
    };
    if (hearAboutUs) lead.hearAboutUs = hearAboutUs;
    if (typeof window !== "undefined") {
      lead.landingPageUrl = window.location.href;
    }

    if (!captchaToken) {
      setStatus("error");
      return;
    }

    try {
      const res = await fetch("/api/lead-capture", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lead, turnstileToken: captchaToken }),
      });
      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
        resetCaptcha();
      }
    } catch {
      setStatus("error");
      resetCaptcha();
    }
  };

  return (
    <div className="mx-auto max-w-3xl rounded-2xl border-0.5 border-white/10 bg-white/5 p-6 sm:p-10">
      {/* Progress */}
      <div className="flex items-center gap-4">
        <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-sswRed transition-width duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="font-mono text-sm text-gray-400">
          {current + 1}/{TOTAL_SCREENS}
        </span>
      </div>

      {status === "success" ? (
        <div className="mt-8 flex flex-col items-center justify-center text-center">
          <h3 className="text-lg text-white lg:text-xl">
            Thanks — we&apos;ve got it.
          </h3>
          <p className="mt-3 text-sm font-light text-gray-300">
            {successMessage}
          </p>
        </div>
      ) : current === 0 ? (
        /* Screen 1 — your details */
        <div className="mt-8">
          <h3 className="mb-6 text-lg text-white lg:text-xl">
            Get in contact - let us know a bit about you.
          </h3>
          <div className="flex flex-col gap-6">
            <SSWAdaptiveField
              inputClassName="border-[0.5px] border-white/15 focus:border-sswRed"
              label={
                <>
                  Name <span className="text-sswRed">*</span>
                </>
              }
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <SSWAdaptiveField
              inputClassName="border-[0.5px] border-white/15 focus:border-sswRed"
              label={
                <>
                  Email <span className="text-sswRed">*</span>
                </>
              }
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <SSWAdaptiveField
              inputClassName="border-[0.5px] border-white/15 focus:border-sswRed"
              label={
                <>
                  Company <span className="text-sswRed">*</span>
                </>
              }
              type="text"
              required
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
            <SSWAdaptiveField
              inputClassName="border-[0.5px] border-white/15 focus:border-sswRed"
              label={
                <>
                  Phone <span className="text-sswRed">*</span>
                </>
              }
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="mt-8 flex justify-end">
            <button
              type="button"
              onClick={goNext}
              disabled={!screen1Valid}
              className={primaryButtonClass}
            >
              Continue
            </button>
          </div>
        </div>
      ) : current === 1 ? (
        /* Screen 2 — location + how you heard */
        <div className="mt-8">
          <h3 className="mb-6 text-lg text-white lg:text-xl">
            Where are you located? <span className="text-sswRed">*</span>
          </h3>
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap gap-3">
              {LOCATIONS.map((loc) => {
                const isSelected = country === loc.label;
                return (
                  <button
                    key={loc.label}
                    type="button"
                    onClick={() => {
                      setCountry(loc.label);
                      setRegion("");
                    }}
                    className={cn(
                      "rounded-xl border-0.5 px-5 py-3 text-sm transition-colors",
                      isSelected
                        ? "border-sswRed bg-sswRed/10 text-white"
                        : "border-white/10 text-gray-200 hover:border-white/30 hover:bg-white/[0.03]"
                    )}
                  >
                    {loc.label}
                  </button>
                );
              })}
            </div>

            {needsRegion && (
              <div className="flex flex-wrap gap-2">
                {selectedCountry?.states.map((st) => {
                  const isSelected = region === st;
                  return (
                    <button
                      key={st}
                      type="button"
                      onClick={() => setRegion(st)}
                      className={cn(
                        "rounded-lg border-0.5 px-4 py-2 text-sm transition-colors",
                        isSelected
                          ? "border-sswRed bg-sswRed/10 text-white"
                          : "border-white/10 text-gray-300 hover:border-white/30 hover:bg-white/[0.03]"
                      )}
                    >
                      {st}
                    </button>
                  );
                })}
              </div>
            )}

            <Field className="mt-2">
              <FieldLabel htmlFor="lc-hear">
                How did you hear about us?{" "}
                <span className="text-gray-500">(optional)</span>
              </FieldLabel>
              <select
                id="lc-hear"
                value={hearAboutUs}
                onChange={(e) => setHearAboutUs(e.target.value)}
                className={cn(
                  "w-full rounded-lg border-0.5 border-white/15 bg-transparent px-4 py-3 text-sm focus:border-sswRed focus:outline-none",
                  hearAboutUs ? "text-white" : "text-gray-500"
                )}
              >
                <option value="" className="bg-sswCard text-gray-300">
                  Please select
                </option>
                {HEAR_ABOUT_OPTIONS.map((opt) => (
                  <option
                    key={opt}
                    value={opt}
                    className="bg-sswCard text-white"
                  >
                    {opt}
                  </option>
                ))}
              </select>
            </Field>
          </div>

          <div className="mt-8 flex items-center justify-between">
            <button type="button" onClick={goBack} className={backButtonClass}>
              <TiArrowLeft aria-hidden className="size-4" />
              Back
            </button>
            <button
              type="button"
              onClick={goNext}
              disabled={!screen2Valid}
              className={primaryButtonClass}
            >
              Continue
            </button>
          </div>
        </div>
      ) : (
        /* Screen 3 — how can we help + submit */
        <form onSubmit={handleSubmit} className="mt-8">
          <SSWAdaptiveField
            multiline
            inputClassName="border-[0.5px] border-white/15 focus:border-sswRed"
            rows={5}
            label={
              <>
                How can we help you? <span className="text-sswRed">*</span>
              </>
            }
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          {status === "error" && (
            <p className="mt-3 text-sm text-sswRed">
              Something went wrong — please try again.
            </p>
          )}

          {TURNSTILE_SITE_KEY ? (
            <div className="mt-6">
              <Turnstile
                ref={turnstileRef}
                siteKey={TURNSTILE_SITE_KEY}
                options={{ appearance: "interaction-only", theme: "dark" }}
                onSuccess={(token) => {
                  setCaptchaToken(token);
                  setCaptchaError(false);
                }}
                onExpire={() => setCaptchaToken("")}
                onError={() => {
                  setCaptchaToken("");
                  setCaptchaError(true);
                }}
              />
              {captchaError && (
                <p className="mt-3 text-sm text-sswRed">
                  Couldn&apos;t load verification. Please disable any ad or
                  privacy blocker for this site, then try again.
                </p>
              )}
            </div>
          ) : (
            <p className="mt-6 text-sm text-white/60">
              Verification is temporarily unavailable. Please try again later.
            </p>
          )}

          <div className="mt-8 flex items-center justify-between">
            <button type="button" onClick={goBack} className={backButtonClass}>
              <TiArrowLeft aria-hidden className="size-4" />
              Back
            </button>
            <button
              type="submit"
              disabled={
                status === "submitting" || !screen3Valid || !captchaToken
              }
              className={primaryButtonClass}
            >
              {status === "submitting" ? "Sending…" : "Complete"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
