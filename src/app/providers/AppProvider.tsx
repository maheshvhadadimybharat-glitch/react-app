// src/app/providers/AppProvider.tsx

import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../../lib/queryClient";

const AppProvider = (
  {children}: {children: React.ReactNode}
) => {
  return(
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

export default AppProvider