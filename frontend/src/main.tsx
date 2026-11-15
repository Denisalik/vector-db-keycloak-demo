import { createRouter, RouterProvider } from '@tanstack/react-router';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

// Generated automatically by TanStack Router on first dev run
import { routeTree } from './routeTree.gen';
import keycloak from "@/providers/keycloak.ts";

const router = createRouter({
  routeTree,
  context: {
    auth: {
      isAuthenticated: false,
      login: () => keycloak.login(),
      logout: () => keycloak.logout(),
      user: null as any,
    }
  }
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

keycloak.init({
  onLoad: 'check-sso',
  pkceMethod: 'S256',
}).then((authenticated) => {
  if (authenticated) {
    router.update({
      context: {
        auth: {
          isAuthenticated: true,
          login: () => keycloak.login(),
          logout: () => keycloak.logout(),
          user: keycloak.tokenParsed,
        },
      },
    });
  }
});
keycloak.onAuthSuccess = () => {
  router.update({
    context: {
      auth: {
        isAuthenticated: true,
        login: () => keycloak.login(),
        logout: () => keycloak.logout(),
        user: keycloak.tokenParsed,
      },
    },
  });
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
