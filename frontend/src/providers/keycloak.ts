import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
  url: import.meta.env.VITE_OAUTH2_URL,
  realm: import.meta.env.VITE_OAUTH2_REALM,
  clientId: import.meta.env.VITE_OAUTH2_CLIENT_ID,
});

export default keycloak;
