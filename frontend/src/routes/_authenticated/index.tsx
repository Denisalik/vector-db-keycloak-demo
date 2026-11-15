import { createFileRoute } from '@tanstack/react-router';
import { useStore } from '@/providers/store.ts';

export const Route = createFileRoute('/_authenticated/')({
  component: HomePage,
});

function HomePage() {
  const user = useStore((state) => state.authentication.user);
  return (
    <div className="space-y-4">
      <h1 className="font-bold text-4xl">KeyCloak OAuth2 ChromaDB demo Application</h1>
      <p className="text-3xl">Welcome {user?.username ?? 'Unknown'}!</p>
      <br />
      <p className="text-muted-foreground">
        It was created using React + TypeScript + TanStack + shadcn/ui + Tailwind
      </p>
    </div>
  );
}
