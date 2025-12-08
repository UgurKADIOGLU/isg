import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
//import './index.css'
import SingUp from "./pages/SingUp";
import "./styles.scss";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SingUp />
  </StrictMode>
);
