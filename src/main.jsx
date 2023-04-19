import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./components/context/useAuth.context";
import { ToggleShowPremiseProvider } from "./components/context/togleShowOnpremise.context";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ToggleShowPremiseProvider>
          <App />
        </ToggleShowPremiseProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
