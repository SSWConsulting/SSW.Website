"use client";

import { ErrorPage, ErrorPageProps } from "@/components/util/error-page";
import { useEffect } from "react";
import "use client"; // Error components must be Client Components

export const Error = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  if (error.message) {
    JSON.stringify(error.message, null, 2);
  }

  return (
    <ErrorPage
      details={JSON.stringify(error.message, null, 2)}
      tipText={tipText()}
    />
  );
};

const tipText = () => {
  return (
    <div>
      <p className="pt-4 text-xl">
        For help, please submit a bug report issue on our GitHub at{" "}
        <a href="https://github.com/SSWConsulting/SSW.Website/issues/new/choose">
          github.com/SSWConsulting/SSW.Website
        </a>{" "}
        or send us an email at{" "}
        <a href="mailto:info@ssw.com.au">info@ssw.com.au</a>.
      </p>
    </div>
  );
};
