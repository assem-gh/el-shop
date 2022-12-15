import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import keycloak from "./utils/keycloack";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <ReactKeycloakProvider
    initOptions={{
      pkceMethod: "S256",
      publicClient: true,
      onLoad: "login-required",
    }}
    authClient={keycloak}
  >
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </ReactKeycloakProvider>
);
