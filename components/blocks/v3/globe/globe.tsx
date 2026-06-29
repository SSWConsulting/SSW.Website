"use client";
import AlternatingText from "@/components/alternating-text";
import ButtonRow from "@/components/blocksSubtemplates/buttonRow";
import V2ComponentWrapper from "@/components/layout/v2ComponentWrapper";
import { Container } from "@/components/util/container";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { FiChevronDown, FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import { tinaField } from "tinacms/dist/react";
import { OfficeMap } from "./officeMap";

function OfficeAccordionItem({ office, isOpen, onToggle }) {
  return (
    <div
      className={cn(
        "border-b border-white/10",
        isOpen && "border-t-2 border-t-sswRed bg-white/[0.03]"
      )}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between px-4 py-5 text-left"
      >
        <span className="text-lg text-white">{office?.name}</span>
        <FiChevronDown
          className={cn(
            "size-5 shrink-0 text-white transition-transform duration-300",
            isOpen && "rotate-180"
          )}
        />
      </button>

      <div
        className={cn(
          "grid transition-all duration-300 ease-in-out",
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="overflow-hidden">
          <div className="flex flex-col gap-4 px-4 pb-6 text-gray-300">
            {office?.email && (
              <a
                href={`mailto:${office.email}`}
                className="flex items-center gap-3 transition-colors hover:text-white"
              >
                <FiMail className="size-5 shrink-0" />
                <span>{office.email}</span>
              </a>
            )}
            {office?.phone && (
              <a
                href={`tel:${office.phone.replace(/\s+/g, "")}`}
                className="flex items-center gap-3 transition-colors hover:text-white"
              >
                <FiPhone className="size-5 shrink-0" />
                <span>{office.phone}</span>
              </a>
            )}
            {office?.address && (
              <div className="flex items-start gap-3">
                <FiMapPin className="mt-1 size-5 shrink-0" />
                <span className="whitespace-pre-line">{office.address}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function V3Globe({ data }) {
  const offices = (data?.offices ?? []).filter(Boolean);
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <V2ComponentWrapper data={data}>
      <Container
        size="custom"
        width="custom"
        padding="px-4 sm:px-8"
        className="max-w-screen-xl py-16 md:py-24"
      >
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          {/* Left: header + office accordion */}
          <div>
            {data?.heading && (
              <h2
                data-tina-field={tinaField(data, "heading")}
                className="m-0 p-0 text-4xl leading-tight text-white lg:text-5xl"
              >
                <AlternatingText text={data.heading} />
              </h2>
            )}
            {data?.subtitle && (
              <p
                data-tina-field={tinaField(data, "subtitle")}
                className="mt-4 text-base font-light text-gray-400"
              >
                {data.subtitle}
              </p>
            )}
            <ButtonRow data={data} className="mt-6 justify-start" />

            {offices.length > 0 && (
              // Reserve the open-state height so toggling a tab doesn't change
              // the column height (which would shift the centered map).
              <div className={cn("mt-10 lg:min-h-[37rem]")}>
                {offices.map((office, index) => (
                  <OfficeAccordionItem
                    key={`v3-office-${index}`}
                    office={office}
                    isOpen={openIndex === index}
                    onToggle={() =>
                      setOpenIndex((current) =>
                        current === index ? -1 : index
                      )
                    }
                  />
                ))}
              </div>
            )}
          </div>

          {/* Right: dotted world map — fixed aspect so it doesn't resize
              (and the dots don't shift) when the accordion opens/closes. */}
          {offices.length > 0 && (
            <div className="hidden lg:block">
              <div className={cn("aspect-[2/1] w-full")}>
                <OfficeMap offices={offices} selectedIndex={openIndex} />
              </div>
            </div>
          )}
        </div>
      </Container>
    </V2ComponentWrapper>
  );
}
