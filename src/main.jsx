import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./components/context/useAuth.context";
import { CheckOutToggleProvider } from "./components/context/checkoutToggle.context";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CheckOutToggleProvider>
          <App />
        </CheckOutToggleProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
