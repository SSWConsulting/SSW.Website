import Image from "next/image";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { TestimonialType } from "../../helpers/getTestimonials";

const defaultAvatar = "/images/thumbs/avatar-thumbnail.png";

type TestimonialCardProps = {
  testimonial: TestimonialType;
};

export const TestimonialCard = ({ testimonial }: TestimonialCardProps) => {
  return (
    <div
      className="flex w-full grow flex-col rounded-md border-b-4 border-b-sswRed bg-gray-100 p-8 text-center text-xl drop-shadow md:min-h-96 md:max-w-sm md:grow-0 md:p-10 md:basis_gap-96-6"
      data-aos="flip-right"
      key={testimonial?.name}
    >
      <div className="flex flex-col items-center">
        <Image
          alt={`Picture of ${testimonial?.name} as an avatar`}
          src={testimonial?.avatar ?? defaultAvatar}
          height={120}
          width={120}
          quality={90}
          className="rounded-full"
        />
      </div>

      <p className="mt-4 min-h-24">
        {testimonial?.name}
        {testimonial?.company && (
          <>
            {", "}
            <span className="font-semibold">{testimonial?.company}</span>
          </>
        )}
      </p>
      <div className="mt-2 text-sm text-ssw-black">
        <TinaMarkdown content={testimonial?.body} />
      </div>
    </div>
  );
};
