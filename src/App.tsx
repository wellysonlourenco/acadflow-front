import { QueryClientProvider } from "@tanstack/react-query";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "sonner";
import { ThemeProvider } from "./components/theme/theme-provider";
import { AuthProvider } from "./context/AuthContext";
import './globals.css';
import { queryClient } from "./lib/react-query";
import { router } from "./routes/routes";

export function App() {

  return (
    <HelmetProvider>
      <AuthProvider>
      <ThemeProvider storageKey="acadflow-theme" defaultTheme="dark">
        <Helmet titleTemplate="%s | Acadflow" />
          <Toaster richColors />
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </ThemeProvider>
      </AuthProvider>
    </HelmetProvider>
  )
}

