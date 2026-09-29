import AlternatingText from "@/components/alternating-text";
import V2ComponentWrapper from "@/components/layout/v2ComponentWrapper";
import { Container } from "@/components/util/container";
import { tinaField } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { spacedParagraphs } from "../shared/spacedParagraphs";

const bodyText = spacedParagraphs(
  "text-base font-light text-gray-600 dark:text-gray-300"
);

export function V3VerticalList({ data }) {
  const items = (data?.items ?? []).filter(Boolean);

  return (
    <V2ComponentWrapper data={data}>
      <Container
        size="custom"
        padding="px-4 sm:px-8"
        className="py-12 md:py-16"
      >
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
          {/* Intro stays pinned while the list scrolls past it (lg+) */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              {data?.brow && (
                <span
                  data-tina-field={tinaField(data, "brow")}
                  className="font-mono text-sm uppercase tracking-wider text-sswRed"
                >
                  {data.brow}
                </span>
              )}
              {data?.heading && (
                <h2
                  data-tina-field={tinaField(data, "heading")}
                  className="my-4 text-3xl text-foreground lg:text-4xl"
                >
                  <AlternatingText text={data.heading} />
                </h2>
              )}
              {data?.description && (
                <div data-tina-field={tinaField(data, "description")}>
                  <TinaMarkdown
                    content={data.description}
                    components={bodyText}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Unnumbered rows: the order isn't a sequence */}
          {items.length > 0 && (
            <ul className="divide-y-0.75 divide-hairline border-y-0.75 border-hairline lg:col-span-7 dark:divide-sswBorder dark:border-sswBorder">
              {items.map((item, index) => (
                <li key={`v3-vertical-list-${index}`} className="py-6">
                  {item?.heading && (
                    <h3
                      data-tina-field={tinaField(item, "heading")}
                      className="text-xl text-foreground"
                    >
                      {item.heading}
                    </h3>
                  )}
                  {item?.description && (
                    <div
                      data-tina-field={tinaField(item, "description")}
                      className="mt-1"
                    >
                      <TinaMarkdown
                        content={item.description}
                        components={bodyText}
                      />
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </Container>
    </V2ComponentWrapper>
  );
}
