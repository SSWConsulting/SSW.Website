import { TinaMarkdown } from "tinacms/dist/rich-text";

const TestimonialPanel = ({ testimonial }) => {
  return (
    <>
      <h3>Testimonials</h3>
      <div className="border-1 border-gray-300 bg-gray-100 px-4 py-3">
        <TinaMarkdown content={testimonial.body} />
        <p>
          <strong>{testimonial.name}</strong> - {testimonial.company}
        </p>
      </div>
    </>
  );
};

export default TestimonialPanel;
