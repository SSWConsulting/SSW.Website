import { TinaMarkdown, TinaMarkdownContent } from "tinacms/dist/rich-text";

type TestimonialPanelProps = {
  testimonial: {
    body?: TinaMarkdownContent;
    name?: string;
    company?: string;
  };
};

const TestimonialPanel = ({ testimonial }: TestimonialPanelProps) => {
  return (
    <>
      <h3>Testimonials</h3>
      <div className="border-2 bg-gray-100 px-4 py-3">
        <TinaMarkdown content={testimonial.body} />
        <p>
          <strong>{testimonial.name}</strong> - {testimonial.company}
        </p>
      </div>
    </>
  );
};

export default TestimonialPanel;
