import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UnAuthedGuard } from "@/lib/guards";
import { useAuth } from "@/stores/auth.store";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/login")({
  component: LoginPage,
  beforeLoad: UnAuthedGuard,
});

function LoginPage() {
  let auth = useAuth();
  let searchParams = new URLSearchParams(window.location.search);
  let token = searchParams.get("token");

  if (searchParams.has("error")) {
    toast.error("There was an error logging in. Please try again.");
  }

  useEffect(() => {
    if (token) {
      auth.authenticate(token);
    }
  }, []);

  return (
    <div className="w-full h-screen flex justify-center items-center p-4">
      <Card>
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>
            Login with Spotify to continue to Spotify Wrapped
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button className="w-full" asChild>
            <a href={`${import.meta.env.VITE_API_URL ?? "http://localhost:8000/api"}/auth/begin`}>
              Continue with Spotify
            </a>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
