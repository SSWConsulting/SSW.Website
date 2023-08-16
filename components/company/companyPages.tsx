import { FC } from "react";
import CompanyPageCard, { CompanyIndexProps } from "./companyPageCard";

const CompanyPages: FC<{
  cardProps: CompanyIndexProps[];
}> = ({ cardProps }) => {
  if (!cardProps) return null;
  const cards = cardProps.map((p, i) => <CompanyPageCard key={i} {...p} />);

  return (
    <div className="mb-2 grid grid-cols-1 gap-3 md:grid-cols-2">{cards}</div>
  );
};

export default CompanyPages;
