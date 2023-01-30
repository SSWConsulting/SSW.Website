import * as React from "react";

import { Container } from "../util/container";
import { Section } from "../util/section";
import Image from "next/image";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import styles from "./TestimonialRow.module.css";

export const TestimonialRow = ({ testimonialsQueryResult }) => {
  const testimonialsData =
    testimonialsQueryResult.data.testimonialsConnection.Testimonials.map(
      (t) => t.Testimonial
    );

  const randomTestimonials = testimonialsData
    .sort(() => 0.5 - Math.random())
    .slice(0, 3);

  return (
    <Section>
      <Container size="custom" className="h-full">
        <div className="grid sm:grid-flow-row md:grid-flow-col">
          {testimonials(randomTestimonials)}
        </div>
      </Container>
    </Section>
  );
};

const testimonials = (data) => {
  return data?.map((testimonial, i) => (
    <div className="not-prose m-5" key={i}>
      <div
        className={`${styles.testimonialBubble} rounded-lg bg-gray-100 p-5 text-xl sm:h-64 md:h-96`}
        data-aos="flip-right"
      >
        <TinaMarkdown content={testimonial?.body} />
      </div>
      <div className="m-2 mt-6 flex text-gray-900">
        <Image
          src={testimonial?.avatar ?? ""}
          height={56}
          width={56}
          className="rounded-full"
        />
        <div className="ml-2">
          <p className="font-semibold">{testimonial?.name}</p>
          <p>{testimonial?.company}</p>
        </div>
      </div>
    </div>
  ));
};
