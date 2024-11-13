"use client";
import { ErrorPageProps } from "@/components/util/error-page";
import { ErrorPage } from "@/components/util/error/error";
import LayoutWrapper from "./layout-wrapper";

// Error boundaries must be Client Components

export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <LayoutWrapper>
      <ErrorPage details={error.message} />
    </LayoutWrapper>
  );
}
