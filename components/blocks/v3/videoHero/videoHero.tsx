"use client";
import AlternatingText from "@/components/alternating-text";
import ButtonRow from "@/components/blocksSubtemplates/buttonRow";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";
import { tinaField } from "tinacms/dist/react";

const VideoBackground = dynamic(() => import("../../videoBackground"));

export function V3VideoHero({ data }) {
  return (
    <section
      className={cn(
        "relative flex min-h-[36rem] w-full items-center justify-center overflow-hidden bg-black md:min-h-screen-4/5"
      )}
    >
      {data?.videoBackground && (
        <VideoBackground
          videoBackground={data.videoBackground}
          tinaField={tinaField}
          props={data}
        />
      )}

      {/* Darkening overlay for legibility */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-black/60 z-videoMask"
      />

      <div className="relative flex w-full max-w-4xl flex-col items-center px-4 text-center z-content">
        {data?.heading && (
          <h2
            data-tina-field={tinaField(data, "heading")}
            className="text-4xl leading-tight text-white sm:text-5xl lg:text-7xl"
          >
            <AlternatingText text={data.heading} />
          </h2>
        )}
        <ButtonRow data={data} className="mt-8 justify-center" />
      </div>
    </section>
  );
}
