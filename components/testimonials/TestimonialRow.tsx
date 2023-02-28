import { useEffect, useState } from "react";
import classNames from "classnames";
import Image from "next/legacy/image";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { Container } from "../util/container";
import { AiFillStar } from "react-icons/ai";

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
    <Container size="custom">
      <div className="mt-17 grid gap-12 md:grid-cols-3">
        {getTestimonialCards(randomTestimonials)}
      </div>
    </Container>
  );
};

const getTestimonialCards = (data) => {
  return data?.map((testimonial, i) => (
      <div
        className="flex flex-col rounded border-b-4 border-b-sswRed bg-white p-10 text-center text-xl drop-shadow sm:h-96 md:h-full"
        key={i}
        data-aos="flip-right"
      >
        <div className="mb-10">
          <div className="mb-5 flex flex-col items-center">
            <Image
              src={testimonial?.avatar ?? ""}
              height={80}
              width={80}
              className="rounded-full"
            />
            <div className="mt-5 flex items-center"> 
              {Array.from(Array(5).keys()).map((rating) => (
                <AiFillStar key={rating}
                  className={classNames(testimonial?.rating > rating ? "text-amber-500" : "text-gray-200", "h-5 w-5 flex-shrink-0")} 
                  aria-hidden="true"
                />
              ))}
            </div> 
          </div>
          <p>{testimonial?.name}, <span className="font-semibold">{testimonial?.company}</span></p>
        </div>
        <div className="text-md font-light text-gray-400">
          <TinaMarkdown content={testimonial?.body} />
        </div>
    </div>
  ));
};
