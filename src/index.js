import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "@fortawesome/fontawesome-free/css/all.min.css";

import ContextProvider from "./contexts/ContextProvider.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ContextProvider>
    <App />
  </ContextProvider>
);
