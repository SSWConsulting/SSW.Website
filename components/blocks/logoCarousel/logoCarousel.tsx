import AlternatingText from "@/components/alternating-text";
import V2ComponentWrapper from "@/components/layout/v2ComponentWrapper";
import { Marquee } from "@/components/ui/marquee";
import { Container } from "@/components/util/container";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { tinaField } from "tinacms/dist/react";
export function LogoCarousel({ data }) {
  const getTabletAlignment = () => {
    switch (data.tabletTextAlignment) {
      case "Left":
        return "text-left justify-start md:text-center md:justify-center";
      default:
        return "text-center justify-center";
    }
  };
  return (
    <V2ComponentWrapper data={data}>
      <Container size="custom" padding="px-4 sm:px-8">
        <div
          className={cn(
            "flex w-full flex-col pb-4 sm:pb-14",
            getTabletAlignment()
          )}
        >
          <h2
            className={cn(
              "!mt-4 p-2 text-xl font-semibold text-white md:text-2xl"
            )}
            data-tina-field={tinaField(data, "heading")}
          >
            <AlternatingText text={data.heading} />
          </h2>
          <div className="mask-horizontal-fade relative h-20 w-full md:h-40">
            <Marquee
              gap="[--gap:0.25rem] sm:[--gap:0.75rem]"
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
