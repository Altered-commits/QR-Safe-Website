//React imports
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
//My imports
import "./Main.css";
import EntryPoint from "../pages/SetupPages/EntryPoint.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <EntryPoint />
  </StrictMode>
);
