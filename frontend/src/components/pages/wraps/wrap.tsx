import { useRouter } from "@tanstack/react-router";
import { RefetchOptions, QueryObserverResult } from "@tanstack/react-query";

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
import { EllipsisVertical, Eye } from "lucide-react";
import { DeleteWrap } from "./delete-wrap";
import { PostWrap } from "./post-wrap";

export const Wrap = ({
  wrap,
  refetch,
  acceptable,
}: {
  wrap: WrapType;
  refetch: (
    options?: RefetchOptions,
  ) => Promise<QueryObserverResult<WrapType[], Error>>;
  acceptable?: true;
}) => {
  const router = useRouter();
  console.log(acceptable);

  return (
    <Card key={wrap.name}>
      <CardHeader className="w-full flex flex-row justify-between">
        <div className="flex flex-col gap-2">
          <CardTitle>{wrap.name}</CardTitle>
          <CardDescription>
            From{" "}
            {new Date(
              Date.parse(wrap.created_at) -
                (wrap.period === "short_term"
                  ? 1000 * 60 * 60 * 24 * 7 * 4
                  : wrap.period === "medium_term"
                    ? 1000 * 60 * 60 * 24 * 7 * 4 * 6
                    : 1000 * 60 * 60 * 24 * 7 * 4 * 12),
            ).toLocaleDateString()}{" "}
            to {new Date(wrap.created_at).toLocaleDateString()}
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
                  to: `/app/wraps/${wrap.id}`,
                });
              }}
            >
              <Eye />
              View
            </DropdownMenuItem>
            <PostWrap wrap={wrap} />
            <DropdownMenuSeparator />
            <DeleteWrap wrap={wrap} refetch={refetch} />
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent>
        <span className="text-sm">
          {wrap.artists.length} artist{wrap.artists.length !== 1 && "s"} /{" "}
          {wrap.tracks.length} track{wrap.tracks.length !== 1 && "s"} /{" "}
          {wrap.users.length} user{wrap.users.length !== 1 && "s"}
        </span>
      </CardContent>
    </Card>
  );
};
