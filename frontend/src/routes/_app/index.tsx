import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/stores/auth.store";
import { useContext } from "@/stores/user.store";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/")({
  component: DashboardHomePage,
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

function DashboardHomePage() {
  const user = useContext(s => s.user);

  return (
    <Card className="w-full mx-auto max-w-md">
      <CardHeader>
        <CardTitle>Dashboard</CardTitle>
        <CardDescription>Welcome to Spotify wrapped!</CardDescription>
      </CardHeader>
      <CardContent>
        <p>
          You are currently logged in as <strong>{user.display_name}</strong>!
        </p>
        <p>Your email is {user.email}</p>
      </CardContent>
      <CardFooter>
        <Button
          onClick={() => useAuth.getState().logout()}
          variant="destructive"
        >
          Logout
        </Button>
      </CardFooter>
    </Card>
  );
}
