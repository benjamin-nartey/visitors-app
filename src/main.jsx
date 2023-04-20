import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./components/context/useAuth.context";
import { ToggleShowPremiseProvider } from "./components/context/togleShowOnpremise.context";
import { CheckOutToggleProvider } from "./components/context/checkoutToggle.context";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ToggleShowPremiseProvider>
          <CheckOutToggleProvider>
            <App />
          </CheckOutToggleProvider>
        </ToggleShowPremiseProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
