import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./App.jsx";
import { RegionProvider } from "./context/RegionContext.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HashRouter>
      <RegionProvider>
        <App />
      </RegionProvider>
    </HashRouter>
  </React.StrictMode>
);
