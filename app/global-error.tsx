"use client";

import { useEffect } from "react";

// Error boundaries must be Client Components

export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  });
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
