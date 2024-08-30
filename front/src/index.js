import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import CurriculumProvider from "./contexts";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <CurriculumProvider>
      <App />
    </CurriculumProvider>
  </React.StrictMode>
);
