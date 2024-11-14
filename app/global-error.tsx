"use client";
import { ErrorPage } from "@/components/util/error-page";
// Error boundaries must be Client Components

export default function GlobalError({ error }: { error: Error }) {
  const errorDetails = error.stack || error.message;
  return (
    <html>
      <body>
        <ErrorPage details={errorDetails}></ErrorPage>
      </body>
    </html>
  );
}
