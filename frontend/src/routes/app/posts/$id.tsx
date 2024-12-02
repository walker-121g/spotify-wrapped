import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

import { getPost, deletePost } from "@/services/social.service";
import { useContext } from "@/stores/user.store";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { LikeButton } from "@/components/pages/feed/post/like-button";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  EllipsisVertical,
  MessageSquareText,
  Loader2,
  Trash,
} from "lucide-react";
import { Comments } from "@/components/pages/feed/post/comments";
import { Follow } from "@/components/pages/feed/follow";

export const Route = createFileRoute("/app/posts/$id")({
  component: PostPage,
});

function PostPage() {
  const router = useRouter();
  const { id } = Route.useParams();
  const { user } = useContext();

  const { isPending, isError, data, refetch } = useQuery({
    queryKey: ["post", id],
    queryFn: async () => await getPost(Number(id)),
  });

  const { isSuccess, mutate } = useMutation({
    mutationKey: ["post", "delete", id],
    mutationFn: async () => await deletePost(Number(id)),
  });

  useMemo(() => {
    if (isSuccess) {
      router.navigate({
        to: "/app",
      });
    }
  }, [isSuccess]);

  return isPending ? (
    <div className="w-full flex flex-col items-center justify-center my-16">
      <Loader2 className="animate-spin" />
    </div>
  ) : isError ? (
    <></>
  ) : (
    <div className="w-full flex flex-col gap-6">
      <Card>
        <CardHeader className="flex flex-row justify-between">
          <Follow
            user={data.user}
            description={`Posted at ${new Date(data.created_at).toLocaleString()}`}
          />
          {user.email === data.user.email && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <EllipsisVertical />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => mutate()}>
                  <Trash />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </CardHeader>
        <CardContent className="w-full flex flex-col gap-2">
          <CardTitle>{data.title}</CardTitle>
          <CardDescription>{data.content}</CardDescription>
        </CardContent>
        <CardFooter className="justify-end">
          <Button variant="ghost" disabled={true}>
            <MessageSquareText />
            {data.comments.length}
          </Button>
          <LikeButton id={data.id} count={data.likes} refetch={refetch} />
          <Button asChild>
            <Link to={`/app/wraps/${data.wrap_id}`}>Wrap Details</Link>
          </Button>
        </CardFooter>
      </Card>
      <Comments post={data} refetch={refetch} />
    </div>
  );
}
