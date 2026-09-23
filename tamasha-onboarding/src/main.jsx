import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.jsx";
import { FormProvider } from "./context/FormContext.jsx";

import "./index.css";

createRoot(
  document.getElementById("root")
).render(
  <StrictMode>
    <FormProvider>
      <App />
    </FormProvider>
  </StrictMode>
);