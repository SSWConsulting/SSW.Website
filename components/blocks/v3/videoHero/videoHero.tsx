"use client";
import AlternatingText from "@/components/alternating-text";
import ButtonRow from "@/components/blocksSubtemplates/buttonRow";
import dynamic from "next/dynamic";
import { tinaField } from "tinacms/dist/react";

const VideoBackground = dynamic(() => import("../../videoBackground"));

export function V3VideoHero({ data }) {
  return (
    <section className="relative flex min-h-[36rem] w-full items-center justify-center overflow-hidden bg-black md:min-h-[80vh]">
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
        className="absolute inset-0 z-videoMask bg-black/60"
      />

      <div className="relative z-content flex w-full max-w-4xl flex-col items-center px-4 text-center">
        {data?.heading && (
          <h1
            data-tina-field={tinaField(data, "heading")}
            className="text-4xl leading-tight text-white sm:text-5xl lg:text-7xl"
          >
            <AlternatingText text={data.heading} />
          </h1>
        )}
        <ButtonRow data={data} className="mt-8 justify-center" />
      </div>
    </section>
  );
}
