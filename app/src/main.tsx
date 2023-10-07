import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SnackBarContextProvider } from "./context/SnackbarContext";
import "./main.scss";
import { DeviceContextProvider } from "./context/DeviceContext";
import { ActiveTabContextProvider } from "./context/ActiveTabContext";

const queryClient: QueryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <DeviceContextProvider>
      <ActiveTabContextProvider>
        <AuthContextProvider>
          <QueryClientProvider client={queryClient}>
            <SnackBarContextProvider>
              <App />
            </SnackBarContextProvider>
          </QueryClientProvider>
        </AuthContextProvider>
      </ActiveTabContextProvider>
    </DeviceContextProvider>
  </React.StrictMode>
);
