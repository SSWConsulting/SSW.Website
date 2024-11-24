"use client";
import { ErrorPage } from "@/components/util/error-page";
import GlobalErrorHandler from "./components/global-error-handler";
export const Error = ({
  error,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  return (
    <GlobalErrorHandler error={error}>
      <ErrorPage details={error.message} />
    </GlobalErrorHandler>
  );
};

export default Error;
