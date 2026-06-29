import AlternatingText from "@/components/alternating-text";
import V2ComponentWrapper from "@/components/layout/v2ComponentWrapper";
import { Marquee } from "@/components/ui/marquee";
import { Container } from "@/components/util/container";
import Image from "next/image";
import { tinaField } from "tinacms/dist/react";

export function V3LogoCarousel({ data }) {
  return (
    <V2ComponentWrapper data={data}>
      <hr className="m-0 w-full border-0 border-b-0.5 border-sswBorder" />
      <Container size="custom" padding="px-4 pt-6 sm:px-8">
        <div className="flex w-full flex-col items-center pb-4 text-center sm:pb-14">
          {data?.heading && (
            <h2
              className="!mt-4 p-2 text-xl text-white md:text-3xl"
              data-tina-field={tinaField(data, "heading")}
            >
              <AlternatingText text={data.heading} />
            </h2>
          )}
          <div className="mask-horizontal-fade relative h-20 w-full md:h-40">
            <Marquee
              gap="[--gap:0.25rem] sm:[--gap:0.75rem]"
              paused={data?.paused === true}
              className="h-full justify-center overflow-hidden"
            >
              <div className="flex h-full items-center justify-center gap-1 sm:gap-3">
                {data?.logos?.map((logo, index) => (
                  <div
                    className="relative h-20 min-w-48 rounded-lg border-0.5 border-sswBorder md:h-26"
                    data-tina-field={tinaField(logo, "altText")}
                    key={`v3-logo-${index}`}
                  >
                    <Image
                      src={logo?.logo ?? "/images/placeholder.png"}
                      alt={logo?.altText ?? "Logo"}
                      fill={true}
                      objectFit="contain"
                      className="brightness-0 invert"
                    />
                  </div>
                ))}
              </div>
            </Marquee>
          </div>
        </div>
      </Container>
    </V2ComponentWrapper>
  );
}
