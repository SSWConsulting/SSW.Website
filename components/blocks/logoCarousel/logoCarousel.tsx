import V2ComponentWrapper from "@/components/layout/v2ComponentWrapper";
import { Marquee } from "@/components/ui/marquee";
import { Container } from "@/components/util/container";
import Image from "next/image";
import { tinaField } from "tinacms/dist/react";

export function LogoCarousel({ data }) {
  return (
    <V2ComponentWrapper data={data}>
      <Container size="custom" padding="px-4 sm:px-8">
        <div className="flex w-full flex-col items-center justify-center pb-14">
          <h2
            className="p-2 text-xl font-semibold text-white md:text-2xl"
            data-tina-field={tinaField(data, "heading")}
          >
            {data.heading}
          </h2>
          <div className="mask-horizontal-fade relative h-20 w-full md:h-40">
            <Marquee
              paused={data?.paused === true}
              pauseOnHover
              className="h-full justify-center overflow-hidden"
            >
              <div className="flex h-full items-center justify-center gap-1 sm:gap-3">
                {data.logos &&
                  data.logos.map((logo, index) => (
                    <div
                      className="relative h-17 min-w-36 md:h-22"
                      data-tina-field={tinaField(logo, "altText")}
                      key={`logo-${index}`}
                    >
                      <Image
                        src={logo?.logo ?? "/images/placeholder.png"}
                        style={{ scale: logo?.scale ? logo.scale / 100 : 1 }}
                        alt={logo?.altText ?? "Logo"}
                        fill={true}
                        objectFit="contain"
                        className={
                          data.isWhiteImages ? "brightness-0 invert" : ""
                        }
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
