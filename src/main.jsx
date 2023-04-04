import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "react-auth-kit";
import { CookiesProvider } from "react-cookie";
import App from "./App";
import "./index.css";
import { UserProvider } from "./components/context/user.context";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider
      authType={"cookie"}
      authName={"accessToken"}
      cookieDomain={window.location.hostname}
      cookieSecure={false}
    >
      <CookiesProvider>
        <UserProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </UserProvider>
      </CookiesProvider>
    </AuthProvider>
  </React.StrictMode>
);
