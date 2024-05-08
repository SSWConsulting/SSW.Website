"use client";

import { useSearchParams } from "next/navigation";
import { Template } from "tinacms";

export type DomainFromQueryProps = {
  title: string;
  showDomain: boolean;
};

const DOMAIN_PARAM_KEY = "domain";

export const DomainFromQuery = (props: DomainFromQueryProps) => {
  const { showDomain, title } = props;
  const searchParams = useSearchParams();
  const domain = searchParams.get(DOMAIN_PARAM_KEY);

  return (
    <>
      {title && <h1 className="mb-2 mt-20 p-0 text-6xl font-bold">{title}</h1>}
      {showDomain && domain && (
        <p className="mb-12 mt-0 text-center text-6xl font-bold text-ssw-red">
          {domain}
        </p>
      )}
    </>
  );
};

export const domainFromQuerySchema: Template = {
  name: "DomainFromQuery",
  label: "Domain from query",
  fields: [
    {
      name: "title",
      label: "Title",
      type: "string",
      description: "This is a H1 heading",
    },
    {
      name: "showDomain",
      label: "Show domain name",
      type: "boolean",
      description: "Query param in URL must have key of 'domain'",
    },
  ],
};
