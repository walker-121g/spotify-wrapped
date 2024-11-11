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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
        <div className="flex flex-row items-center gap-2">
          <Avatar>
            <AvatarImage src="" alt="avatar" />
            <AvatarFallback>{post.user.name[0]}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-1">
            <CardTitle>{post.user.name}</CardTitle>
            <CardDescription>
              Posted at {new Date(post.created_at).toLocaleString()}
            </CardDescription>
          </div>
        </div>
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
        <LikeButton id={post.id} count={post.likes} />
      </CardFooter>
    </Card>
  );
};
