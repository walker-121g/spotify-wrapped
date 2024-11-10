import { useRouter } from "@tanstack/react-router";

import { Wrap as WrapType } from "@/services/types/wrap";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { EllipsisVertical, ExternalLink, Eye } from "lucide-react";
import { DeleteWrap } from "./delete-wrap";
import { PostWrap } from "./post-wrap";

export const Wrap = ({ wrap }: { wrap: WrapType }) => {
  const router = useRouter();

  return (
    <Card key={wrap.name}>
      <CardHeader className="w-full flex flex-row justify-between">
        <div className="flex flex-col gap-2">
          <CardTitle>{wrap.name}</CardTitle>
          <CardDescription>
            {wrap.period
              .split("_")
              .map((p) => `${p.charAt(0).toUpperCase()}${p.substring(1)}`)
              .join(" ")}{" "}
            - {new Date(wrap.created_at).toLocaleDateString()}
          </CardDescription>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <EllipsisVertical />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="z-50">
            <DropdownMenuLabel>Wrap Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                router.navigate({
                  to: `/app/wrap/${wrap.id}`,
                });
              }}
            >
              <Eye />
              View
            </DropdownMenuItem>
            <PostWrap wrap={wrap} />
            <DropdownMenuSeparator />
            <DeleteWrap wrap={wrap} />
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent>
        <span className="text-sm">
          {wrap.artists.length} album{wrap.artists.length !== 1 && "s"} /{" "}
          {wrap.tracks.length} track{wrap.tracks.length !== 1 && "s"} /{" "}
          {wrap.users.length} user{wrap.users.length !== 1 && "s"}
        </span>
      </CardContent>
    </Card>
  );
};
