import Keycloak, { KeycloakConfig } from "keycloak-js";

const config: KeycloakConfig = {
  clientId: import.meta.env.VITE_KC_CLIENT_ID,
  realm: import.meta.env.VITE_KC_REALM,
  url: import.meta.env.VITE_AUTH_API_BASE_URL,
};

const keycloak = new Keycloak(config);
export default keycloak;
