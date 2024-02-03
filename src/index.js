import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import ContextWrapper from "./context/ContextWrapper";

const root = document.getElementById("root");
const rootContainer = ReactDOM.createRoot(root);

rootContainer.render(
  <React.StrictMode>
    <ContextWrapper>
      <App />
    </ContextWrapper>
  </React.StrictMode>
);
