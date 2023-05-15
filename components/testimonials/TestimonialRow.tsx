import Image from "next/image";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { Container } from "../util/container";
import { Rating } from "../util/consulting/rating";

export const TestimonialRow = ({ testimonialsResult }) => {
  return (
    <Container size="custom">
      <h2 className="mb-8 text-center">
        What do people <span className="text-sswRed">say</span>?
      </h2>
      <div className="grid gap-6 md:grid-cols-3">
        {testimonialsResult?.map((testimonial, i) => (
          <TestimonialCard key={i} testimonial={testimonial} />
        ))}
      </div>
    </Container>
  );
};

const TestimonialCard = ({ testimonial }) => {
  return (
    <div
      className="flex flex-col rounded-md border-b-4 border-b-sswRed bg-gray-100 p-10 text-center text-xl drop-shadow sm:h-96 md:h-full"
      data-aos="flip-right"
    >
      <div className="flex flex-col items-center">
        <Image
          alt={`Picture of ${testimonial?.name} as an avatar`}
          src={testimonial?.avatar ?? ""}
          height={120}
          width={120}
          className="rounded-full"
        />
      </div>
      <Rating className="mx-auto mt-8" rating={testimonial?.rating} />
      <p className="mt-4 min-h-24">
        {testimonial?.name}
        {", "}
        <span className="font-semibold">{testimonial?.company}</span>
      </p>
      <div className="mt-2 text-sm text-gray-900">
        <TinaMarkdown content={testimonial?.body} />
      </div>
    </div>
  );
};
