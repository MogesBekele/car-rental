import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import { MotionConfig } from "motion/react";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <AppProvider>
      <MotionConfig>
        <App />
      </MotionConfig>
    </AppProvider>
  </BrowserRouter>
);
