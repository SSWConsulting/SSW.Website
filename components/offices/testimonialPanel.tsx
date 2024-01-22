type TestimonialPanelProps = {
  testimonial: {
    body?: string;
    name?: string;
    company?: string;
  };
};

const TestimonialPanel = ({ testimonial }: TestimonialPanelProps) => {
  console.log("🚀 ~ TestimonialPanel ~ testimonial:", testimonial);
  return (
    <>
      <h3>Testimonials</h3>
      <div className="border-2 bg-gray-100 px-4 py-3">
        {testimonial.body}
        <p>
          <strong>{testimonial.name}</strong> - {testimonial.company}
        </p>
      </div>
    </>
  );
};

export default TestimonialPanel;
