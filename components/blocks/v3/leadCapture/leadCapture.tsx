"use client";

import AlternatingText from "@/components/alternating-text";
import V2ComponentWrapper from "@/components/layout/v2ComponentWrapper";
import { Container } from "@/components/util/container";
import { cn } from "@/lib/utils";
import { useMemo, useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { HiSparkles } from "react-icons/hi2";
import { tinaField } from "tinacms/dist/react";

const OPTION_LETTERS = ["A", "B", "C", "D"];

type SubmitState = "idle" | "submitting" | "success" | "error";

export function V3LeadCapture({ data }) {
  const steps = (data?.steps ?? []).filter(Boolean);
  const submitStep = data?.leadSubmitStep ?? {};

  // Each quiz step is one screen; the contact step is the final screen.
  const totalScreens = steps.length + 1;
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<SubmitState>("idle");

  const isContactStep = current === steps.length;
  const progress = Math.round(((current + 1) / totalScreens) * 100);

  const goNext = () =>
    setCurrent((c) => Math.min(c + 1, totalScreens - 1));
  const goBack = () => setCurrent((c) => Math.max(c - 1, 0));

  const selectOption = (index: number, value: string) => {
    setAnswers((prev) => ({ ...prev, [index]: value }));
    // Auto-advance after a multiple-choice selection.
    setCurrent((c) => Math.min(c + 1, totalScreens - 1));
  };

  const canSubmit = useMemo(
    () => /.+@.+\..+/.test(email.trim()),
    [email]
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit || status === "submitting") return;
    setStatus("submitting");

    // Map each answer to its configured JotForm field id.
    const fields: Record<string, string> = {};
    steps.forEach((step, index) => {
      const value = answers[index];
      if (step?.jotFormFieldId && value) fields[step.jotFormFieldId] = value;
    });
    if (data?.emailFieldId) fields[data.emailFieldId] = email.trim();

    try {
      const res = await fetch("/api/lead-capture", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jotFormId: data?.leadJotFormId, fields }),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <V2ComponentWrapper data={data}>
      <Container size="custom" padding="px-4 sm:px-8" className="py-16 md:py-24">
        <div className="mx-auto max-w-3xl rounded-2xl border-[0.5px] border-white/10 bg-white/5 p-6 sm:p-10">
          {/* Progress bar */}
          <div className="flex items-center gap-4">
            <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-sswRed transition-[width] duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="font-mono text-sm text-gray-400">
              {current + 1}/{totalScreens}
            </span>
          </div>

          {status === "success" ? (
            <div className="py-16 text-center">
              <h3 className="text-2xl font-bold text-white">Thanks — you're booked in.</h3>
              <p className="mt-3 text-base font-light text-gray-300">
                A senior React engineer will be in touch within one business day.
              </p>
            </div>
          ) : isContactStep ? (
            /* Final contact step */
            <form onSubmit={handleSubmit} className="mt-10">
              {submitStep?.header && (
                <h4
                  data-tina-field={tinaField(submitStep, "header")}
                  className="mt-6 text-xl font-bold text-white lg:text-xl"
                >
                  {submitStep.header}
                </h4>
              )}
              {submitStep?.subheader && (
                <p
                  data-tina-field={tinaField(submitStep, "subheader")}
                  className="mt-4 max-w-2xl text-base font-light text-gray-300"
                >
                  {submitStep.subheader}
                </p>
              )}

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={submitStep?.emailPlaceholder ?? "you@company.com"}
                  className="flex-1 rounded-lg border-[0.5px] border-white/15 bg-transparent px-4 py-3 text-base text-white placeholder:text-gray-500 focus:border-sswRed focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={!canSubmit || status === "submitting"}
                  className="rounded-lg bg-sswRed px-6 py-3 text-base font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {status === "submitting"
                    ? "Sending…"
                    : submitStep?.submitButtonText ?? "Book my meeting"}
                </button>
              </div>

              {status === "error" && (
                <p className="mt-3 text-sm text-sswRed">
                  Something went wrong — please try again.
                </p>
              )}
              {submitStep?.footnote && status !== "error" && (
                <p
                  data-tina-field={tinaField(submitStep, "footnote")}
                  className="mt-3 text-sm font-light text-gray-500"
                >
                  {submitStep.footnote}
                </p>
              )}

              <button
                type="button"
                onClick={goBack}
                className="mt-8 inline-flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-white"
              >
                <FiArrowLeft aria-hidden className="size-4" />
                Change my answers
              </button>
            </form>
          ) : (
            /* Quiz question step */
            <div className="mt-10">
              {steps[current]?.heading && (
                <h2
                  data-tina-field={tinaField(steps[current], "heading")}
                  className="text-xl font-bold text-white lg:text-2xl"
                >
                  <AlternatingText text={steps[current].heading} />
                </h2>
              )}

              {steps[current]?.showTextArea ? (
                <div className="mt-8">
                  <textarea
                    rows={4}
                    value={answers[current] ?? ""}
                    onChange={(e) =>
                      setAnswers((prev) => ({ ...prev, [current]: e.target.value }))
                    }
                    placeholder={`What are you building, and what would a great outcome look like? 
A sentence or two is enough`}
                    className="w-full rounded-lg border-[0.5px] border-white/15 bg-transparent px-4 py-3 text-base text-white placeholder:text-gray-500 focus:border-sswRed focus:outline-none"
                  />
                  <div className="mt-6 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={goBack}
                      className={cn(
                        "inline-flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-white",
                        current === 0 && "invisible"
                      )}
                    >
                      <FiArrowLeft aria-hidden className="size-4" />
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={goNext}
                      className="rounded-lg bg-sswRed px-6 py-3 text-base font-semibold text-white transition-opacity hover:opacity-90"
                    >
                      Continue
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="mt-8 flex flex-col gap-3">
                    {(steps[current]?.options ?? []).map((option, i) => {
                      const isSelected = answers[current] === option;
                      return (
                        <button
                          key={`opt-${i}`}
                          type="button"
                          onClick={() => selectOption(current, option)}
                          className={cn(
                            "group flex items-center gap-4 rounded-xl border-[0.5px] px-4 py-4 text-left transition-colors",
                            isSelected
                              ? "border-sswRed bg-sswRed/10"
                              : "border-white/10 hover:border-white/30 hover:bg-white/[0.03]"
                          )}
                        >
                          <span
                            className={cn(
                              "flex size-8 shrink-0 items-center justify-center rounded-md border-[0.5px] font-mono text-sm",
                              isSelected
                                ? "border-sswRed text-sswRed"
                                : "border-white/20 text-gray-400"
                            )}
                          >
                            {OPTION_LETTERS[i]}
                          </span>
                          <span className="text-base text-gray-200">{option}</span>
                        </button>
                      );
                    })}
                  </div>

                  {current > 0 && (
                    <button
                      type="button"
                      onClick={goBack}
                      className="mt-8 inline-flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-white"
                    >
                      <FiArrowLeft aria-hidden className="size-4" />
                      Back
                    </button>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </Container>
    </V2ComponentWrapper>
  );
}
