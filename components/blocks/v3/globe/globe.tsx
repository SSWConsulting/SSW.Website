"use client";
import AlternatingText from "@/components/alternating-text";
import ButtonRow from "@/components/blocksSubtemplates/buttonRow";
import V2ComponentWrapper from "@/components/layout/v2ComponentWrapper";
import { Container } from "@/components/util/container";
import { cn } from "@/lib/utils";
import { useState } from "react";
import {
  FiChevronDown,
  FiExternalLink,
  FiMail,
  FiMapPin,
  FiPhone,
} from "react-icons/fi";
import { tinaField } from "tinacms/dist/react";
import { OfficeMap } from "./officeMap";

function OfficeAccordionItem({ office, isOpen, onToggle }) {
  return (
    <div
      className={cn(
        "border-b border-white/10 bg-sswBorder",
        isOpen && "border-t-2 border-t-sswRed bg-sswBlack"
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
            {office?.siteLinkUrl && (
              <a
                href={office.siteLinkUrl}
                className="flex items-center gap-3 transition-colors hover:text-white"
              >
                <FiExternalLink className="size-5 shrink-0" />
                <span>{office.siteLinkText || office.siteLinkUrl}</span>
              </a>
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
        className="max-w-screen-xl py-24"
      >
        <div className="flex flex-col gap-12">
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
                className="mt-4 max-w-2xl text-base font-light text-gray-400"
              >
                {data.subtitle}
              </p>
            )}
            <ButtonRow data={data} className="mt-6 justify-start" />
          </div>

          <div className="relative grid gap-12 lg:grid-cols-12 lg:items-center xl:gap-16">
            {/* Left: office accordion */}
            <div className="relative z-20 lg:col-span-4">
              {offices.length > 0 && (
                <div
                  className={cn(
                    "overflow-hidden rounded-lg bg-sswBorder shadow-2xl"
                  )}
                >
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
              <div className="relative z-0 hidden lg:col-span-8 lg:block">
                <div
                  className={cn(
                    "relative aspect-[2/1] w-[calc(100%+4rem)] max-w-none -translate-x-4 xl:w-[calc(100%+7rem)]"
                  )}
                >
                  <OfficeMap offices={offices} selectedIndex={openIndex} />
                </div>
              </div>
            )}
          </div>
        </div>
      </Container>
    </V2ComponentWrapper>
  );
}
