import { useAuth } from "@/stores/auth.store";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/")({
  component: () => <div>Hello /dashboard/!</div>,
  beforeLoad: async () => {
    let token = useAuth.getState().token;
    if (token) {
      return true;
    }

    try {
      await useAuth.getState().refresh();
      if (useAuth.getState().isAuthed) {
        return true;
      }
    } catch {
      throw redirect({
        to: "/login",
        replace: true,
      });
    }
  },
});
