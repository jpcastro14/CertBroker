import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import { router } from "./App";
import { AuthProvider } from "./contexts/authProvider";
import { BrokerProvider } from "./contexts/brokerProvider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrokerProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </BrokerProvider>
  </StrictMode>
);
