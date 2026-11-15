import { Login01Icon, Logout } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { createRootRouteWithContext, Link, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { Button } from '@/components/ui/button.tsx';
import { Toaster } from '@/components/ui/sonner.tsx';
import { TooltipProvider } from '@/components/ui/tooltip.tsx';

export interface RouterContext {
  auth: {
    isAuthenticated: boolean;
    login: () => void;
    logout: () => void;
    user: {
      name: string;
      sub: string;
      email: string;
      exp: number;
      auth_time: number;
      preferred_username: string;
    } | undefined | null;
  };
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootComponent,
});

function RootComponent() {
  const { auth } = Route.useRouteContext();
  return (
    <>
      <div className="flex border-b">
        <div className="flex flex-10 gap-4 p-4">
          <Link to="/" className="hover:underline [&.active]:font-bold">
            Home
          </Link>
        </div>
        {auth.isAuthenticated ? (
          <div className="flex flex-2 border-l p-4">
            <Button
              type="button"
              onClick={auth.logout}
              className="w-full bg-linear-to-r from-emerald-500 to-teal-600 font-medium text-white shadow-md shadow-emerald-500/25 transition-all duration-200 hover:from-emerald-600 hover:to-teal-700 hover:shadow-lg hover:shadow-emerald-500/35 focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 active:scale-[0.98]"
            >
              <HugeiconsIcon icon={Logout} className="h-4 w-4" />
              Log out
            </Button>
          </div>
        ) : (
          <div className="flex flex-2 border-l p-4">
            <Button
              type="button"
              onClick={auth.login}
              className="w-full bg-linear-to-r from-emerald-500 to-teal-600 font-medium text-white shadow-md shadow-emerald-500/25 transition-all duration-200 hover:from-emerald-600 hover:to-teal-700 hover:shadow-lg hover:shadow-emerald-500/35 focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 active:scale-[0.98]"
            >
              <HugeiconsIcon icon={Login01Icon} className="h-4 w-4" />
              Log in
            </Button>
          </div>
        )}
      </div>
      <main className="p-4">
        <TooltipProvider>
          <Outlet />
        </TooltipProvider>
      </main>
      <Toaster />
      <TanStackRouterDevtools />
    </>
  );
}
