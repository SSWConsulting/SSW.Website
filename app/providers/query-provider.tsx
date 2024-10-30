"use client";

const FIVE_MINS = 1000 * 60 * 5;

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: { queries: { staleTime: FIVE_MINS } },
  });
}

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React from "react";

export function QueryProvider({ children }) {
  const [queryClient] = React.useState(makeQueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {process.env.NODE_ENV === "development" && (
        <ReactQueryDevtools
          initialIsOpen={false}
          buttonPosition="bottom-left"
        />
      )}
    </QueryClientProvider>
  );
}
