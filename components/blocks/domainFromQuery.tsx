import { useSearchParams } from "next/navigation";
import { Template } from "tinacms";

type DomainFromQueryProps = {
  showDomain: boolean;
};

const DOMAIN_PARAM_KEY = "domain";

export const DomainFromQuery = (props: DomainFromQueryProps) => {
  const { showDomain } = props;
  const searchParams = useSearchParams();
  const domain = searchParams.get(DOMAIN_PARAM_KEY);

  if (!showDomain || !domain) return null;

  return (
    <p className="m-0 text-center text-6xl font-bold text-ssw-red">{domain}</p>
  );
};

export const domainFromQuerySchema: Template = {
  name: "DomainFromQuery",
  label: "Domain from query",
  fields: [
    {
      name: "showDomain",
      label: "Show domain name",
      type: "boolean",
      description: "Query param in URL must have key of 'domain'",
    },
  ],
};
