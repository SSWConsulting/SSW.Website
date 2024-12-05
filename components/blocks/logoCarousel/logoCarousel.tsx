import { Marquee } from "@/components/ui/marquee";
import { Container } from "@/components/util/container";
import Image from "next/image";
import { tinaField } from "tinacms/dist/react";
import V2ComponentWrapper from "../imageComponents/imageTextBlock/v2ComponentWrapper";

export function LogoCarousel({ data }) {
  return (
    <V2ComponentWrapper data={data} shouldFadeIn={false}>
      <Container size="custom">
        <div className="flex w-full flex-col items-center justify-center pt-8">
          <h2
            className="p-2 text-xl font-semibold text-white md:text-2xl"
            data-tina-field={tinaField(data, "heading")}
          >
            {data.heading}
          </h2>
          <div className="mask-horizontal-fade relative h-17 w-full md:h-40">
            <Marquee
              pauseOnHover
              className="h-full justify-center overflow-hidden"
            >
              <div className="flex h-full items-center justify-center gap-3">
                {data.logos &&
                  data.logos.map((logo, index) => (
                    <div
                      className="relative h-17 min-w-36 md:h-22 md:min-w-48"
                      key={`logo-${index}`}
                    >
                      <Image
                        src={logo?.logo ?? "/images/placeholder.png"}
                        alt={logo?.altText ?? "Logo"}
                        fill={true}
                        objectFit="contain"
                        data-tina-field={tinaField(logo, "altText")}
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
