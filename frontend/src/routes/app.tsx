import { Sidebar } from "@/components/router/app/sidebar";
import { Topbar } from "@/components/router/app/topbar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AuthedGuard } from "@/lib/guards";
import { http } from "@/services/http.service";
import { useAuth } from "@/stores/auth.store";
import { useContext, UserContext } from "@/stores/user.store";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";

export const Route = createFileRoute("/app")({
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
    return (
      <main className="w-screen h-screen items-center justify-center">
        <Card>
          <CardHeader>
            <CardTitle>Failed to get context</CardTitle>
            <CardDescription>
              Failed to retrieve your user information, please logout and login
              again
            </CardDescription>
          </CardHeader>
          <CardFooter className="justify-end gap-4">
            <Button variant="ghost" onClick={() => window.location.reload()}>
              Try Again
            </Button>
            <Button onClick={() => useAuth.getState().refresh()}>
              Refresh Tokens
            </Button>
            <Button
              variant="destructive"
              onClick={() => useAuth.getState().logout()}
            >
              Logout
            </Button>
          </CardFooter>
        </Card>
      </main>
    );
  }

  useContext.getState().setUser(q.data as UserContext);

  return (
    <main className="w-screen h-screen flex flex-row overflow-hidden">
      <Sidebar />
      <div className="w-[-webkit-fill-available] h-screen flex flex-col overflow-x-hidden">
        <Topbar />
        <div className="w-full overflow-y-auto overflow-x-hidden p-8 md:p-16">
          <Outlet />
        </div>
      </div>
    </main>
  );
}
