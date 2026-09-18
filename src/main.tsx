import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/chatkode.css";
import "./styles/kode.css";
import { App } from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
