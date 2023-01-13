import * as React from "react";

import type { Template } from "tinacms";

import { Container } from "../util/container";
import { Section } from "../util/section";
import Image from "next/image";
import { TinaMarkdown } from "tinacms/dist/rich-text";

export const TestimonialRow = ({ data }) => {
  return (
    <Section>
      <Container size="custom" className="h-full">
        <div className="grid sm:grid-flow-row md:grid-flow-col">
          {testimonials(data.testimonials)}
        </div>
      </Container>
    </Section>
  );
};

const testimonials = (data) => {
  return data.map((testimonial, i) => (
    <div className="m-5" key={i}>
      <div
        className="testimonialBubble rounded-lg bg-gray-100 p-5 text-lg sm:h-64 md:h-80"
        data-aos="flip-right"
      >
        <TinaMarkdown content={testimonial.body} />
      </div>
      <div className="m-2 mt-6 flex text-gray-900">
        <Image
          src={testimonial.avatar ?? ''}
          width="51"
          height="51"
          className="rounded-full"
        />
        <div className="ml-2">
          <p className="font-semibold">{testimonial.name}</p>
          <p>{testimonial.company}</p>
        </div>
      </div>
    </div>
  ));
};

export const testimonialBlockSchema: Template = {
  name: "TestimonialRow",
  label: "Testimonials",
  ui: {
    previewSrc: "/blocks/testimonials.png",
  },
  fields: [
    {
      label: "Testimonials",
      type: "object",
      name: "testimonials",
      list: true,
      ui: {
        defaultItem: {},
        itemProps: (item) => ({ label: item.name }),
      },
      fields: [
        {
          type: "string",
          label: "Name",
          name: "name",
        },
        {
          type: "image",
          label: "Avatar",
          name: "avatar",
        },
        {
          type: "string",
          label: "Company",
          name: "company",
        },
        {
          type: "rich-text",
          label: "Body",
          name: "body",
        },
      ],
    },
  ],
};
