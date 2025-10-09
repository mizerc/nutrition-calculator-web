import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
// import './styles/globals.css';
import { GlobalStyles } from "twin.macro";
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GlobalStyles />
    <App />
  </StrictMode>
);
