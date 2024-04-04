import { useSearchParams } from "next/navigation";
import { Template } from "tinacms";

type DomainForSaleProps = {
  showDomain: boolean;
};

const DOMAIN_PARAM_KEY = "domain";

export const DomainForSale = (props: DomainForSaleProps) => {
  const { showDomain } = props;
  const searchParams = useSearchParams();
  const domain = searchParams.get(DOMAIN_PARAM_KEY);

  if (!showDomain) return null;

  return <p className="text-center text-4xl text-ssw-red">{domain}</p>;
};

export const domainForSaleSchema: Template = {
  name: "DomainForSale",
  label: "Domain from param",
  fields: [
    {
      name: "showDomain",
      type: "boolean",
    },
  ],
};
