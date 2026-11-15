/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BACKEND_API_BASE: string;
  readonly VITE_PORT: string;
  readonly VITE_OAUTH2_URL: string;
  readonly VITE_OAUTH2_REALM: string;
  readonly VITE_OAUTH2_CLIENT_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
