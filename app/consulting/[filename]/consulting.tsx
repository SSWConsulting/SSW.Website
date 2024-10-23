"use client";

import { BookingButton, BuiltOnAzure } from "@/components/blocks";
import { Booking } from "@/components/blocks/booking";
import { Section } from "@/components/util/section";
import { removeExtension } from "@/services/client/utils.service";
import { Breadcrumbs } from "app/components/breadcrumb";

export default function Consulting({ tinaProps, props }) {
  const { data } = tinaProps;
  return (
    <>
      <Section className="mx-auto min-h-24 w-full max-w-9xl px-8 py-5 md:min-h-16">
        <Breadcrumbs
          path={removeExtension(props.variables.relativePath)}
          suffix={data.global.breadcrumbSuffix}
          title={data.consulting.seo?.title}
          seoSchema={data.consulting.seo}
        />
      </Section>
      <Section className="w-full" color="black">
        <Booking {...data.consulting.booking}>
          <BookingButton />
        </Booking>
      </Section>

      <Section>
        <BuiltOnAzure data={{ backgroundColor: "default" }} />
      </Section>
    </>
  );
}
