import AlternatingText from "@/components/alternating-text";
import { Icon } from "@/components/blocksSubtemplates/tinaFormElements/icon";
import V2ComponentWrapper from "@/components/layout/v2ComponentWrapper";
import { Container } from "@/components/util/container";
import { VideoModal } from "@/components/videoModal";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { TiArrowRight } from "react-icons/ti";
import { tinaField } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";

export function V3VideoHighlights({ data }) {
  return (
    <V2ComponentWrapper data={data}>
      <Container
        size="custom"
        padding="px-4 sm:px-8"
        className="py-16 md:py-24"
      >
        <div className="grid grid-cols-1 items-start gap-10 xl:grid-cols-2 xl:gap-16">
          {/* Video */}
          {data?.videoUrl && (
            <figure className="mx-auto w-full max-w-150 xl:mx-0">
              <div
                data-tina-field={tinaField(data, "videoUrl")}
                className={cn(
                  "overflow-hidden rounded-2xl border-0.5 border-sswRed/40",
                  // Greyscale the poster image only; the played iframe stays colour.
                  data?.greyscaleThumbnail && "[&_img]:grayscale"
                )}
              >
                <VideoModal
                  url={data.videoUrl}
                  thumbnail={data.thumbnail || undefined}
                  roundedEdges
                />
              </div>
              {data?.figure && (
                <figcaption
                  data-tina-field={tinaField(data, "figure")}
                  className="mt-3 text-center text-sm text-gray-400 xl:text-left"
                >
                  {data.figure}
                </figcaption>
              )}
            </figure>
          )}

          {/* Heading + description + highlights */}
          <div className="flex flex-col">
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
                className="my-4 text-3xl text-white lg:text-4xl"
              >
                <AlternatingText text={data.heading} />
              </h2>
            )}
            {data?.description && (
              <div
                data-tina-field={tinaField(data, "description")}
                className="max-w-prose"
              >
                <TinaMarkdown
                  content={data.description}
                  components={{
                    p: (props) => (
                      <p
                        {...props}
                        className="text-base font-light text-gray-300"
                      />
                    ),
                  }}
                />
              </div>
            )}

            {data?.highlights?.length > 0 && (
              <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2">
                {data.highlights.map((item, index) => (
                  <div key={`v3-highlight-${index}`} className="flex flex-col">
                    {item?.icon && (
                      <Icon
                        data={{ name: item.icon }}
                        tinaField={tinaField(item, "icon")}
                        className="size-8 text-white"
                      />
                    )}
                    {item?.title && (
                      <h3
                        data-tina-field={tinaField(item, "title")}
                        className="mt-4 text-xl text-white"
                      >
                        {item.title}
                      </h3>
                    )}
                    {item?.desc2 && (
                      <div className="mt-2">
                        <TinaMarkdown
                          content={item.desc2}
                          components={{
                            p: (props) => (
                              <p
                                {...props}
                                className="text-base font-light text-gray-300"
                              />
                            ),
                          }}
                        />
                      </div>
                    )}
                    {item?.link && (
                      <Link
                        href={item.link}
                        data-tina-field={tinaField(item, "link")}
                        className="group mt-4 inline-flex items-center gap-1 text-sm font-semibold uppercase tracking-wide text-white transition hover:text-sswRed"
                      >
                        Read More
                        <TiArrowRight className="size-5 transition group-hover:translate-x-1" />
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </Container>
    </V2ComponentWrapper>
  );
}
