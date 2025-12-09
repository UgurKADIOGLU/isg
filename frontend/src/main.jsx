import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
//import './index.css'
import Accident from "./pages/Accident";
import "./styles.scss";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Accident />
  </StrictMode>
);
