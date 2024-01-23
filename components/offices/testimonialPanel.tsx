type TestimonialPanelProps = {
  body?: string;
  name?: string;
  company?: string;
};

const TestimonialPanel = ({ props }) => {
  if (!props) return <></>;
  const { body, name, company }: TestimonialPanelProps = JSON.parse(props);
  return (
    <>
      <h3>Testimonials</h3>
      <div className="border-2 bg-gray-100 px-4 py-3">
        {body}
        <p>
          <strong>{name}</strong> - {company}
        </p>
      </div>
    </>
  );
};

export default TestimonialPanel;
