"use client";

// PROTOTYPE — throwaway. Three layouts for a new V3 "vertical list" block,
// shown in place of the <V3> Process block via ?variant=A|B|C on
// /events/ai-for-business-leaders (the agenda). Without ?variant the real
// Process block renders unchanged. Lives on a prototype/ branch, not main.

import AlternatingText from "@/components/alternating-text";
import { PrototypeSwitcher } from "@/components/prototype/prototypeSwitcher";
import { Container } from "@/components/util/container";
import { useSearchParams } from "next/navigation";
import { BiCheck } from "react-icons/bi";
import { TinaMarkdown } from "tinacms/dist/rich-text";

const VARIANTS = [
  { key: "A", name: "Split: sticky intro + rows" },
  { key: "B", name: "Centred checklist cards" },
  { key: "C", name: "Editorial full-width rows" },
];

const Brow = ({ children }) => (
  <span className="font-mono text-sm uppercase tracking-wider text-sswRed">
    {children}
  </span>
);

const Body = ({ content, className = "" }) => (
  <TinaMarkdown
    content={content}
    components={{
      p: (props) => (
        <p
          {...props}
          className={`text-base font-light text-gray-300 ${className}`}
        />
      ),
    }}
  />
);

// A — intro pinned on the left, hairline-divided rows on the right
function VariantA({ data }) {
  return (
    <Container size="custom" padding="px-4 sm:px-8" className="py-12 md:py-16">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            {data?.brow && <Brow>{data.brow}</Brow>}
            <h2 className="my-4 text-3xl text-white lg:text-4xl">
              <AlternatingText text={data?.heading} />
            </h2>
            {data?.description && <Body content={data.description} />}
          </div>
        </div>
        <ul className="divide-y-0.75 divide-sswBorder border-y-0.75 border-sswBorder lg:col-span-7">
          {data?.steps?.map((step, i) => (
            <li key={i} className="py-6">
              <h3 className="text-xl text-white">{step?.heading}</h3>
              {step?.description && (
                <Body content={step.description} className="mt-1" />
              )}
            </li>
          ))}
        </ul>
      </div>
    </Container>
  );
}

// B — centred header, single column of cards with a red check marker
function VariantB({ data }) {
  return (
    <Container size="custom" padding="px-4 sm:px-8" className="py-12 md:py-16">
      <div className="mx-auto max-w-3xl text-center">
        {data?.brow && <Brow>{data.brow}</Brow>}
        <h2 className="my-4 text-3xl text-white lg:text-4xl">
          <AlternatingText text={data?.heading} />
        </h2>
        {data?.description && <Body content={data.description} />}
      </div>
      <ul className="mx-auto mt-10 flex max-w-3xl flex-col gap-3">
        {data?.steps?.map((step, i) => (
          <li
            key={i}
            className="flex gap-4 rounded-2xl border-0.75 border-sswBorder bg-sswCard p-5"
          >
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-sswRed/15 text-sswRed">
              <BiCheck className="size-5" />
            </span>
            <div>
              <h3 className="text-lg text-white">{step?.heading}</h3>
              {step?.description && (
                <Body content={step.description} className="mt-1" />
              )}
            </div>
          </li>
        ))}
      </ul>
    </Container>
  );
}

// C — header split across the top, then big-type full-width rows
function VariantC({ data }) {
  return (
    <Container size="custom" padding="px-4 sm:px-8" className="py-12 md:py-20">
      <div className="grid grid-cols-1 items-end gap-6 lg:grid-cols-2">
        <div>
          {data?.brow && <Brow>{data.brow}</Brow>}
          <h2 className="mt-4 text-3xl text-white lg:text-5xl">
            <AlternatingText text={data?.heading} />
          </h2>
        </div>
        {data?.description && <Body content={data.description} />}
      </div>
      <ul className="mt-12">
        {data?.steps?.map((step, i) => (
          <li
            key={i}
            className="group grid grid-cols-1 gap-2 border-t-0.75 border-sswBorder py-7 transition-colors last:border-b-0.75 lg:grid-cols-12 lg:items-baseline lg:gap-8"
          >
            <h3 className="text-2xl text-white transition-colors group-hover:text-sswRed lg:col-span-6 lg:text-3xl">
              {step?.heading}
            </h3>
            {step?.description && (
              <div className="lg:col-span-6">
                <Body content={step.description} className="lg:text-lg" />
              </div>
            )}
          </li>
        ))}
      </ul>
    </Container>
  );
}

export function VerticalListPrototypeGate({ data, children }) {
  const variant = useSearchParams().get("variant");
  if (!VARIANTS.some((v) => v.key === variant)) return children;

  return (
    <>
      {variant === "A" && <VariantA data={data} />}
      {variant === "B" && <VariantB data={data} />}
      {variant === "C" && <VariantC data={data} />}
      <PrototypeSwitcher variants={VARIANTS} current={variant} />
    </>
  );
}
