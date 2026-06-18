import AlternatingText from "@/components/alternating-text";
import V2ComponentWrapper from "@/components/layout/v2ComponentWrapper";
import { Container } from "@/components/util/container";
import { tinaField } from "tinacms/dist/react";

export default function V3Statistics({ data }) {
  const stats = data?.statistics ?? [];

  return (
    <V2ComponentWrapper data={data}>
      <Container
        size="custom"
        padding="px-4 sm:px-8"
        className="border-y-[0.75px] border-[#212121]"
      >
        <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-y-0 lg:divide-x-[0.75px] lg:divide-[#212121]">
          {/* Intro: heading on the left */}
          <div className="flex items-center py-8 lg:pr-8">
            {data?.heading && (
              <h2
                data-tina-field={tinaField(data, "heading")}
                className="mt-0 text-xl font-semibold text-white lg:text-2xl"
              >
                <AlternatingText text={data.heading} />
              </h2>
            )}
          </div>

          {/* Statistic columns */}
          {stats.map((stat, index) => (
            <div
              key={`v3-stat-${index}`}
              className="flex flex-col py-8 lg:px-8"
            >
              <div className="flex items-baseline">
                <span
                  data-tina-field={tinaField(stat, "figure")}
                  className="text-4xl leading-none text-white lg:text-5xl"
                >
                  {stat?.figure}
                </span>
                {stat?.figureSuffix && (
                  <span
                    data-tina-field={tinaField(stat, "figureSuffix")}
                    className="ml-1 text-3xl font-light text-white lg:text-4xl"
                  >
                    {stat.figureSuffix}
                  </span>
                )}
              </div>
              {stat?.heading && (
                <h3
                  data-tina-field={tinaField(stat, "heading")}
                  className="mt-4 text-lg font-semibold text-white"
                >
                  {stat.heading}
                </h3>
              )}
              {stat?.description && (
                <p
                  data-tina-field={tinaField(stat, "description")}
                  className="text-base font-light text-gray-400"
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
