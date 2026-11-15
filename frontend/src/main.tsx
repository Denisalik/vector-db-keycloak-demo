import { createRouter, RouterProvider } from '@tanstack/react-router';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

import keycloak from '@/providers/keycloak.ts';
// Generated automatically by TanStack Router on first dev run
import { routeTree } from './routeTree.gen';
import type {RouterContext} from "@/routes/__root.tsx";

const router = createRouter({
  routeTree,
  context: {
    auth: {
      isAuthenticated: false,
      login: () => keycloak.login(),
      logout: () => keycloak.logout(),
      user: null as any,
    },
  },
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

keycloak
  .init({
    onLoad: 'login-required',
    pkceMethod: 'S256',
  })
  .then(async (authenticated) => {
    if (authenticated) {
      router.update({
        context: {
          auth: {
            isAuthenticated: true,
            login: () => keycloak.login(),
            logout: () => keycloak.logout(),
            user: keycloak.tokenParsed as RouterContext['auth']['user'],
          },
        },
      });
      await router.invalidate();
    }
  });

keycloak.onAuthSuccess = async () => {
  router.update({
    context: {
      auth: {
        isAuthenticated: true,
        login: () => keycloak.login(),
        logout: () => keycloak.logout(),
        user: keycloak.tokenParsed as RouterContext['auth']['user'],
      },
    },
  });
  await router.invalidate();
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
