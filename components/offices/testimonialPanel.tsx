import {
  getRandomClientTestimonial,
  getTestimonialByName,
} from "../../helpers/getTestimonials";

type TestimonialPanelProps = {
  body?: string;
  name?: string;
  company?: string;
};

const TestimonialPanel = ({ testimonialName = "" }) => {
  const testimonial: TestimonialPanelProps = testimonialName
    ? getTestimonialByName(testimonialName)
    : getRandomClientTestimonial();

  const { body, name, company }: TestimonialPanelProps = testimonial;

  return (
    <>
      <h3>Testimonials</h3>
      {testimonial ? (
        <div className="border-2 bg-gray-100 px-4 py-3">
          {body}
          <p>
            <strong>{name}</strong> - {company}
          </p>
        </div>
      ) : (
        <p>No Testimonial found!</p>
      )}
    </>
  );
};

export default TestimonialPanel;
