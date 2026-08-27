"use client";

import React, { useState, ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import Provider from "./Provider";

interface MainProvidersProps {
  children: ReactNode;
}

export const MainProviders = ({ children }: MainProvidersProps) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1 minute
            refetchOnWindowFocus: false,
            retry: 1,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <Provider>
        {children}
        <Toaster position="top-right" richColors />
      </Provider>
    </QueryClientProvider>
  );
};

export default MainProviders;
