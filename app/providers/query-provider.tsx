import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ReactNode, useMemo } from "react";

const FIVE_MINS = 1000 * 60 * 5;

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: { queries: { staleTime: FIVE_MINS } },
  });
}

export const QueryProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = useMemo(() => makeQueryClient(), []);

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
};
