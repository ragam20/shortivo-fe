import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { App } from "./app/index.tsx";
import { HelmetProvider } from "react-helmet-async";
import { TooltipProvider } from "./components/ui/tooltip";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HelmetProvider>
      <TooltipProvider>
        <App />
      </TooltipProvider>
    </HelmetProvider>
  </StrictMode>,
);
