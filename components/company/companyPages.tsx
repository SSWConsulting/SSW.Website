import CompanyPageCard from "./companyPageCard";

const CompanyPages = ({ cardProps, schema }) => {
  if (!cardProps) return null;
  const cards = cardProps.map((p, i) => (
    <CompanyPageCard key={i} data={p} schema={schema} index={i} />
  ));

  return (
    <div className="mx-auto mb-2 grid w-full max-w-9xl grid-cols-1 gap-3 rounded p-8 md:grid-cols-2">
      {cards}
    </div>
  );
};

export default CompanyPages;
