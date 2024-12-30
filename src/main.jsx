import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router";
import MainRoute from "./Routes/MainRoute.jsx";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import ContextProvider from "./assets/ContextProvider/ContextProvider.jsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ContextProvider>
        <BrowserRouter>
          <MainRoute />
        </BrowserRouter>
      </ContextProvider>
    </QueryClientProvider>
  </StrictMode>
);
