"use client";
import AlternatingText from "@/components/alternating-text";
import ButtonRow from "@/components/blocksSubtemplates/buttonRow";
import V2ComponentWrapper from "@/components/layout/v2ComponentWrapper";
import { Container } from "@/components/util/container";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useMediaQuery } from "usehooks-ts";
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
        "relative border-b border-hairline bg-gray-100 dark:border-white/10 dark:bg-sswBorder",
        isOpen && "bg-gray-200 dark:bg-sswBlack"
      )}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between px-4 py-5 text-left"
      >
        <span className="text-lg text-foreground">{office?.name}</span>
        <FiChevronDown
          className={cn(
            "size-5 shrink-0 text-foreground transition-transform duration-300",
            isOpen && "rotate-180"
          )}
        />
      </button>

      <div
        inert={!isOpen}
        className={cn(
          "grid transition-all duration-300 ease-in-out",
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="overflow-hidden">
          <div className="flex flex-col gap-4 px-4 pb-6 text-muted-foreground">
            {office?.email && (
              <a
                href={`mailto:${office.email}`}
                className="flex items-center gap-3 transition-colors hover:text-foreground"
              >
                <FiMail className="size-5 shrink-0" />
                <span>{office.email}</span>
              </a>
            )}
            {office?.phone && (
              <a
                href={`tel:${office.phone.replace(/\s+/g, "")}`}
                className="flex items-center gap-3 transition-colors hover:text-foreground"
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
                className="flex items-center gap-3 transition-colors hover:text-foreground"
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
  // The globe stage is `hidden lg:block`; only mount the WebGL canvas on the
  // desktop viewports that actually show it so phones/tablets don't pay the
  // GPU/battery cost of an off-screen, never-visible animation.
  const isDesktop = useMediaQuery("(min-width: 1024px)", {
    initializeWithValue: false,
  });

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
                className="m-0 p-0 text-4xl leading-tight text-foreground lg:text-5xl"
              >
                <AlternatingText text={data.heading} />
              </h2>
            )}
            {data?.subtitle && (
              <p
                data-tina-field={tinaField(data, "subtitle")}
                className="mt-4 max-w-2xl text-base font-light text-muted-foreground"
              >
                {data.subtitle}
              </p>
            )}
            <ButtonRow data={data} className="mt-6 justify-start" />
          </div>

          <div className="relative grid gap-12 lg:grid-cols-12 lg:items-center xl:gap-16">
            {/* Left: office accordion */}
            <div className="relative z-20 lg:col-span-5">
              {offices.length > 0 && (
                <div
                  className={cn(
                    "overflow-hidden rounded-utility border-0.75 border-hairline bg-white dark:bg-sswBorder"
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

            {/* Right: 3D globe stage. The stage box is gated purely by CSS
                (`hidden lg:block`) so its height is reserved in the server HTML
                at first paint — this stops the section, and the footer below
                it, from jumping when the client-only WebGL canvas mounts. Only
                the canvas itself waits for `isDesktop` (see note above). */}
            {offices.length > 0 && (
              <div className="relative z-0 hidden lg:col-span-7 lg:block">
                <div
                  className={cn(
                    "relative flex min-h-[34rem] w-full items-center justify-center xl:min-h-[40rem]"
                  )}
                >
                  {isDesktop && (
                    <OfficeMap offices={offices} selectedIndex={openIndex} />
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </Container>
    </V2ComponentWrapper>
  );
}
