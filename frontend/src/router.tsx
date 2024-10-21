import { createRouter as createTanStackRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import DefaultCatchBoundary from "./components/router/defaults/error";
import NotFoundBoundary from "./components/router/defaults/not-found";

export function createRouter() {
  return createTanStackRouter({
    routeTree,
    defaultPreload: "intent",
    defaultPreloadStaleTime: 0,
    defaultErrorComponent: DefaultCatchBoundary,
    defaultNotFoundComponent: () => <NotFoundBoundary />,
    context: {
      isLoggedIn: undefined!,
    },
  });
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof createRouter>;
  }
}
