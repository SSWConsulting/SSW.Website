import { useEffect, useState } from "react";
import Image from "next/legacy/image";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { Container } from "../util/container";
import styles from "./TestimonialRow.module.css";

export const TestimonialRow = ({ testimonialsQueryResult }) => {
  const testimonialsData =
    testimonialsQueryResult.data.testimonialsConnection.Testimonials.map(
      (t) => t.Testimonial
    );

  const [randomTestimonials, setRandomTestimonials] = useState([]);
  useEffect(() => {
    const testimonials = testimonialsData
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);
    setRandomTestimonials(testimonials);
  }, []);

  return (
    <Container size="custom" className="mb-15 h-full">
      <div className="grid sm:grid-flow-row md:grid-flow-col">
        {testimonials(randomTestimonials)}
      </div>
    </Container>
  );
};

const testimonials = (data) => {
  return data?.map((testimonial, i) => (
    <div className="not-prose p-5" key={i}>
      <div
        className={`${styles.testimonialBubble} rounded-lg bg-gray-100 p-5 text-xl sm:h-64 md:h-full`}
        data-aos="flip-right"
      >
        <TinaMarkdown content={testimonial?.body} />
      </div>
      <div className="m-2 mt-6 flex text-gray-900">
        {/* TODO: refactor with next/image */}
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
