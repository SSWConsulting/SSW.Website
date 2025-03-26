"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

export type DomainFromQueryProps = {
  title: string;
  showDomain: boolean;
};

const DOMAIN_PARAM_KEY = "domain";

const DomainFromQueryContent = ({
  title,
  showDomain,
}: DomainFromQueryProps) => {
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

export const DomainFromQuery = (props: DomainFromQueryProps) => {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <DomainFromQueryContent {...props} />
    </Suspense>
  );
};
