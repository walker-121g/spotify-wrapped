import { useRouter } from "@tanstack/react-router";
import {
  RefetchOptions,
  QueryObserverResult,
  useMutation,
} from "@tanstack/react-query";

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
import { Check, EllipsisVertical, Eye, X } from "lucide-react";
import { DeleteWrap } from "./delete-wrap";
import { PostWrap } from "./post-wrap";
import { updateWrap } from "@/services/wrap.service";
import { useEffect } from "react";

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

  const { isPending, isError, isSuccess, mutate } = useMutation({
    mutationKey: ["update", "wrap", wrap.id],
    mutationFn: async (accept: boolean) => await updateWrap(wrap.id, accept),
  });

  useEffect(() => {
    if (isSuccess) {
      refetch();
    }
  }, [isSuccess]);

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
            {acceptable && !isPending && !isError && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => {
                    mutate(true);
                  }}
                >
                  <Check />
                  Accept
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    mutate(false);
                  }}
                >
                  <X />
                  Decline
                </DropdownMenuItem>
              </>
            )}
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
          {wrap.artist_count} artist{wrap.artist_count !== 1 && "s"} /{" "}
          {wrap.track_count} track{wrap.track_count !== 1 && "s"} /{" "}
          {wrap.users.length} user{wrap.users.length !== 1 && "s"}
        </span>
      </CardContent>
    </Card>
  );
};
