import { Marquee } from "@/components/ui/marquee";
import Image from "next/image";

export function LogoCarousel({ data }) {
  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="mb-8 text-3xl font-bold">{data.heading}</h2>
      <div className="relative flex h-48 w-full flex-col items-center justify-center overflow-hidden rounded-lg border md:shadow-xl">
        <Marquee pauseOnHover>
          {data.logos.map((logo, index) => (
            <Image
              key={`logo-${index}`}
              src={logo.logo}
              alt={logo.altText}
              className="h-12 w-auto"
            />
          ))}
        </Marquee>
      </div>
    </div>
  );
}
