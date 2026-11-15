import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: ({ context }) => {
    if (!context.auth.isAuthenticated) {
      context.auth.login();
      throw new Error('Redirecting to login...');
    }
  },
});
