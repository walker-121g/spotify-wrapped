import { createFileRoute, Link } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import { Header } from "@/components/router/header";

export const Route = createFileRoute("/")({
  component: LandingPage,
});

function LandingPage() {
  return (
    <div className="w-screen h-screen flex flex-col">
      <Header />
      <main className="w-screen h-screen flex flex-col items-center justify-center text-center p-24">
        <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold">Wrapped</h1>
        <p className="text-xs md:text-sm mt-4 mb-8">
          View your Spotify Wraps year-round and share them with friends
        </p>
        <Button asChild>
          <Link href="/login">Get Started</Link>
        </Button>
      </main>
    </div>
  );
}
