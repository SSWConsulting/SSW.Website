import AlternatingText from "@/components/alternating-text";
import V2ComponentWrapper from "@/components/layout/v2ComponentWrapper";
import { Container } from "@/components/util/container";
import Image from "next/image";
import Link from "next/link";
import { tinaField } from "tinacms/dist/react";

export function V3Pills({ data }) {
  const pills = data?.pills ?? [];

  return (
    <V2ComponentWrapper data={data}>
      <Container
        size="custom"
        padding="px-4 sm:px-8"
        className="py-16 md:py-24"
      >
        {data?.brow && (
          <span
            data-tina-field={tinaField(data, "brow")}
            className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-sswRed"
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
        {data?.subtitle && (
          <p
            data-tina-field={tinaField(data, "subtitle")}
            className="max-w-2xl text-base font-light text-gray-400"
          >
            {data.subtitle}
          </p>
        )}

        {pills.length > 0 && (
          <div className="mt-10 flex flex-wrap gap-3">
            {pills.map((pill, index) => {
              const inner = (
                <>
                  {pill?.image && (
                    <span className="relative size-5 shrink-0">
                      <Image
                        src={pill.image}
                        alt={pill?.imageAlt ?? pill?.label ?? ""}
                        fill
                        sizes="20px"
                        className="object-contain"
                      />
                    </span>
                  )}
                  <span>{pill?.label}</span>
                </>
              );

              const className =
                "flex h-12 items-center gap-2.5 rounded-xl border-0.75 border-sswBorder bg-sswCard px-5 font-semibold text-white";

              return pill?.link ? (
                <Link
                  key={`v3-pill-${index}`}
                  href={pill.link}
                  target={pill?.newTab ? "_blank" : undefined}
                  rel={pill?.newTab ? "noopener noreferrer" : undefined}
                  data-tina-field={tinaField(pill, "label")}
                  className={`${className} !no-underline transition hover:border-sswRed`}
                >
                  {inner}
                </Link>
              ) : (
                <div
                  key={`v3-pill-${index}`}
                  data-tina-field={tinaField(pill, "label")}
                  className={className}
                >
                  {inner}
                </div>
              );
            })}
          </div>
        )}
      </Container>
    </V2ComponentWrapper>
  );
}
