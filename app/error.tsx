"use client";

import { ErrorPage } from "@/components/util/error-page";
export const Error = ({
  error,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  if (error.message) {
    JSON.stringify(error.message, null, 2);
  }

  return <ErrorPage details={error.message} />;
};

export default Error;
