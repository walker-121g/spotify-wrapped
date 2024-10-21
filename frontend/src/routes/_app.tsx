import { AuthedGuard } from "@/lib/guards";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";

export const Route = createFileRoute("/_app")({
  component: AppLayout,
  beforeLoad: AuthedGuard,
});

function Loader() {
  return (
    <div className="grid w-full h-screen items-center justify-center">
      <Loader2 className="animate-spin w-10 h-10 text-primary" />
    </div>
  );
}

function AppLayout() {
  if (Math.random() > 0.5) {
    return <Loader />;
  }

  return (
    <div className="grid grid-cols-1 px-6 w-full max-w-6xl mx-auto pb-6">
      <main>
        <Outlet />
      </main>
    </div>
  );
}
