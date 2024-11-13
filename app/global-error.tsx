"use client";
import { ErrorPage } from "@/components/util/error/error";
import { useEffect } from "react";
import LayoutWrapper from "./layout-wrapper";

// Error boundaries must be Client Components

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <LayoutWrapper>
      <ErrorPage />
    </LayoutWrapper>
  );
}
