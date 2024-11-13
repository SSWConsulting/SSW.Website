"use client";
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
    <html>
      <body>
        <h1>Error occurred in layout</h1>
        {/* <LayoutWrapper>
          <ErrorPage details={error.message} />
        </LayoutWrapper> */}
      </body>
    </html>
  );
}
