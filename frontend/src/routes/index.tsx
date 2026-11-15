import { createFileRoute } from '@tanstack/react-router';
import {findSimilarMovie, type SimilarMovie} from "@/providers/request.ts";
import {useState, type KeyboardEvent} from "react";
import {toast} from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {Toaster} from "@/components/ui/sonner.tsx";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import { Button } from "@/components/ui/button";
import {SendIcon} from "@hugeicons/core-free-icons";
import {HugeiconsIcon} from "@hugeicons/react";

export const Route = createFileRoute('/')({
  component: HomePage,
});

function HomePage() {
  const { auth } = Route.useRouteContext();
  const [text, setText] = useState("");
  const [movies, setMovies] = useState<SimilarMovie[]>([]);
  const handleSend = async () => {
    if (!text.trim()) {
      toast.error("Please enter a value before sending.");
      return;
    }
    await findSimilarMovie(text).then(mov => setMovies(mov));
    setText("");
    toast.success("Similar Movies founded successfully!");
  };
  const handleKeyDown = async (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      await handleSend();
    }
  };
  return (
    <div className="space-y-4">
      <h1 className="text-4xl font-bold">KeyCloak OAuth2 ChromaDB demo Application</h1>
      <p className="text-3xl">Welcome {auth.user?.name ?? 'Unknown'}!</p>
      <div className="min-h-screen bg-background p-4 md:p-8">
        <div className="mx-auto max-w-4xl space-y-6">
          <Card>
            <CardContent>
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  await handleSend();
                }}
                className="flex flex-col gap-4 sm:flex-row sm:items-end"
              >
                <div className="flex-1 space-y-2">
                  <Label htmlFor="text">Text</Label>
                  <Input
                    id="text"
                    placeholder="Enter text to find similar film"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onKeyDown={handleKeyDown}
                  />
                  <Button type="submit" className="w-full sm:w-auto">
                    <HugeiconsIcon icon={SendIcon} size={18}/>
                    Send
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">
                Movies{" "}
                <span className="text-sm font-normal text-muted-foreground">
                ({movies.length})
              </span>
              </h2>
            </div>

            {movies.length !== 0 && (
              <div className="grid gap-4 sm:grid-cols-3">
                {movies.map((movie) => (
                  <Card key={movie.id}>
                    <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Movie #{movie.id}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="space-y-1">
                        <Label className="text-xs text-muted-foreground">
                          Title
                        </Label>
                        <p className="text-sm font-medium truncate">
                          {movie.title}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs text-muted-foreground">
                          Overview
                        </Label>
                        <p className="text-sm font-medium">
                          {movie.overview.trim() === '' ? 'No overview' : movie.overview }
                        </p>
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs text-muted-foreground">
                          Keywords
                        </Label>
                        <p className="text-sm font-medium">
                          {movie.keywords.trim() === '' ? 'No keywords' : movie.keywords }
                        </p>
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs text-muted-foreground">
                          average score
                        </Label>
                        <p className="text-sm font-medium truncate">
                          {movie["average score"]}
                        </p>
                      </div>
                      <div className="grid grid-cols-2 gap-2 border-t pt-2">
                        <div>
                          <Label className="text-xs text-muted-foreground">
                            Distance to your search text
                          </Label>
                          <p className="text-sm font-mono font-medium">
                            {movie.distance}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
        <Toaster richColors position="top-right" />
      </div>
  </div>
  );
}
