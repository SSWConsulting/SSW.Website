import AlternatingText from "@/components/alternating-text";
import V2ComponentWrapper from "@/components/layout/v2ComponentWrapper";
import { Container } from "@/components/util/container";
import { cn } from "@/lib/utils";
import { tinaField } from "tinacms/dist/react";

// Border logic per cell (0 = intro, 1-3 = stats), assuming a 4-cell layout:
//  - <768px  : vertical stack, horizontal line between each row
//  - 768-1024: 2x2 square, internal cross (left col gets right edge, top row
//              gets bottom edge); outer top/bottom comes from the wrapper
//  - >=1024px: single row, vertical line between each column
const cellBorder = (i: number) =>
  cn(
    "border-[#212121]",
    // stacked
    i > 0 && "border-t-[0.75px]",
    // square (2x2)
    "md:border-t-0",
    (i === 0 || i === 2) && "md:border-r-[0.75px]",
    (i === 0 || i === 1) && "md:border-b-[0.75px]",
    // single row
    "lg:border-b-0 lg:border-r-0",
    i > 0 && "lg:border-l-[0.75px]"
  );

export default function V3Statistics({ data }) {
  const stats = data?.statistics ?? [];

  return (
    <V2ComponentWrapper className="border-y-0.75 border-sswBorder" data={data}>
      <Container size="custom" padding="px-4 sm:px-0" className="">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {/* Intro: heading on the left */}
          <div className={cn("flex items-center p-8", cellBorder(0))}>
            {data?.heading && (
              <h2
                data-tina-field={tinaField(data, "heading")}
                className="my-0 text-2xl text-white"
              >
                <AlternatingText text={data.heading} />
              </h2>
            )}
          </div>

          {/* Statistic columns */}
          {stats.map((stat, index) => (
            <div
              key={`v3-stat-${index}`}
              className={cn("flex flex-col p-8", cellBorder(index + 1))}
            >
              <div className="flex items-baseline">
                <span
                  data-tina-field={tinaField(stat, "figure")}
                  className="text-6xl leading-none text-white lg:text-5xl xl:text-6xl"
                >
                  {typeof stat?.figure === "number"
                    ? stat.figure.toLocaleString("en-US")
                    : stat?.figure}
                </span>
                {stat?.figureSuffix && (
                  <span
                    data-tina-field={tinaField(stat, "figureSuffix")}
                    className="ml-1 text-4xl font-light text-white lg:text-3xl xl:text-4xl"
                  >
                    {stat.figureSuffix}
                  </span>
                )}
              </div>
              {stat?.heading && (
                <h3
                  data-tina-field={tinaField(stat, "heading")}
                  className="text-white lg:text-base xl:text-lg"
                >
                  {stat.heading}
                </h3>
              )}
              {stat?.description && (
                <p
                  data-tina-field={tinaField(stat, "description")}
                  className="text-gray-400 lg:text-sm xl:text-base"
                >
                  {stat.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </Container>
    </V2ComponentWrapper>
  );
}
