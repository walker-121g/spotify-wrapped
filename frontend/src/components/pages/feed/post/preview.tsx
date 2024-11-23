import { useRouter } from "@tanstack/react-router";

import { Post } from "@/services/types/social";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { LikeButton } from "./like-button";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical, Eye, MessageSquareText } from "lucide-react";
import { Follow } from "../follow";

export const PostPreview = ({
  post,
  ref,
}: {
  post: Post;
  ref?: (node: HTMLElement | null) => void;
}) => {
  const router = useRouter();

  return (
    <Card key={post.id} ref={ref}>
      <CardHeader className="flex flex-row justify-between">
        <Follow
          user={post.user}
          description={`Posted at ${new Date(post.created_at).toLocaleString()}`}
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <EllipsisVertical />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                router.navigate({
                  to: `/app/posts/${post.id}`,
                });
              }}
            >
              <Eye />
              View
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className="w-full flex flex-col gap-2">
        <CardTitle>{post.title}</CardTitle>
        <CardDescription>{post.content}</CardDescription>
      </CardContent>
      <CardFooter className="justify-end">
        <Button variant="ghost" disabled={true}>
          <MessageSquareText />
          {post.comments}
        </Button>
        <LikeButton id={post.id} />
      </CardFooter>
    </Card>
  );
};
