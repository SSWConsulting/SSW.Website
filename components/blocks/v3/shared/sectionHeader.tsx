import AlternatingText from "@/components/alternating-text";
import ButtonRow from "@/components/blocksSubtemplates/buttonRow";
import { cn } from "@/lib/utils";
import { tinaField } from "tinacms/dist/react";

// Two-column section header: heading on the left, subtitle + CTA on the right.
// Shared by Featured Products and Events.
export function SectionHeader({ data }) {
  return (
    <div className="flex flex-col gap-8 p-4 md:flex-row md:items-start md:justify-between">
      {data?.heading && (
        <h2
          data-tina-field={tinaField(data, "heading")}
          className={cn(
            "m-0 w-full p-0 text-4xl leading-tight text-white md:max-w-[560px] md:flex-1 lg:text-5xl"
          )}
        >
          <AlternatingText text={data.heading} />
        </h2>
      )}
      <div
        className={cn(
          "flex w-full flex-col items-start md:max-w-[560px] md:flex-1"
        )}
      >
        {data?.subtitle && (
          <p
            data-tina-field={tinaField(data, "subtitle")}
            className={cn("max-w-[560px] text-base font-light text-gray-400")}
          >
            {data.subtitle}
          </p>
        )}
        <ButtonRow data={data} className="mt-6 justify-start" />
      </div>
    </div>
  );
}
