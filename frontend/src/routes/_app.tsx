import { AuthedGuard } from "@/lib/guards";
import { http } from "@/services/http.service";
import { useAuth } from "@/stores/auth.store";
import { useContext, UserContext } from "@/stores/user.store";
import { useQuery } from "@tanstack/react-query";
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
  const q = useQuery({
    queryKey: ["context"],
    queryFn: async () => {
      return await http<unknown>("GET", "/auth/me");
    },
    retry: false,
  });

  if (q.isLoading) {
    return <Loader />;
  } else if (q.isError) {
    useAuth.getState().logout();
  }

  useContext.getState().setUser(q.data as UserContext);

  return (
    <div className="grid grid-cols-1 px-6 w-full max-w-6xl mx-auto pb-6">
      <main className="w-full">
        <Outlet />
      </main>
    </div>
  );
}
