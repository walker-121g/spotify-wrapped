import DefaultCatchBoundary from "@/components/router/defaults/error";
import NotFound from "@/components/router/defaults/not-found";
import { Toaster } from "@/components/ui/sonner";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";

export const Route = createRootRouteWithContext<{
  isLoggedIn: boolean;
}>()({
  errorComponent: DefaultCatchBoundary,
  notFoundComponent: () => <NotFound />,
  component: () => {
    return (
      <div className="w-full">
        <Outlet />
        <Toaster position="top-right" />
      </div>
    );
  },
});
