import { createFileRoute } from "@tanstack/react-router";

import { useContext } from "@/stores/user.store";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export const Route = createFileRoute("/app/profile")({
  component: ProfilePage,
});

function ProfilePage() {
  const context = useContext();

  return (
    <div className="w-full flex flex-col gap-4">
      <Card>
        <CardHeader className="flex flex-row gap-2">
          <Avatar className="w-16 h-16">
            <AvatarImage
              className="object-cover"
              src={context.user?.images[0]?.url}
            />
            <AvatarFallback>
              {context.user?.display_name?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="">
            <CardTitle className="text-lg">
              {context.user?.display_name}
            </CardTitle>
            <CardDescription>{context.user?.email}</CardDescription>
          </div>
        </CardHeader>
        <CardContent></CardContent>
      </Card>
    </div>
  );
}
