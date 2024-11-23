import { useMemo } from "react";
import { useMutation } from "@tanstack/react-query";

import { useContext } from "@/stores/user.store";
import { deleteComment } from "@/services/social.service";

import { PostDetail } from "@/services/types/social";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical, Trash } from "lucide-react";
import { CreateComment } from "./create-comment";

import ErrorImage from "@/assets/undraw_friends.svg";

export const Comments = (props: { post: PostDetail; refetch?: () => void }) => {
  const { user } = useContext();

  const { isSuccess, mutate } = useMutation({
    mutationKey: ["delete", "comment"],
    mutationFn: async (id: number) => await deleteComment(id),
  });

  useMemo(() => {
    if (isSuccess && props.refetch) {
      props.refetch();
    }
  }, [isSuccess]);

  return (
    <div className="w-full flex flex-col gap-4">
      <h2 className="text-lg font-semibold">Comments</h2>
      {props.post.comments.length > 0 ? (
        <>
          {props.post.comments.map((comment) => (
            <div className="w-full flex flex-row gap-2">
              <Avatar>
                <AvatarImage src="" alt="avatar" />
                <AvatarFallback>{comment.user.name[0]}</AvatarFallback>
              </Avatar>
              <div className="w-full flex flex-row justify-between">
                <div className="w-full flex flex-col">
                  <h3 className="text-lg font-semibold">{comment.user.name}</h3>
                  <span className="text-sm">{comment.content}</span>
                  <span className="text-xs text-muted-foreground mt-1">
                    {new Date(comment.created_at).toLocaleString()}
                  </span>
                </div>
                {comment.user.email === user.email && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <EllipsisVertical />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => mutate(comment.id)}>
                        <Trash />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>
            </div>
          ))}
        </>
      ) : (
        <div className="w-full flex flex-col gap-2 my-8">
          <img src={ErrorImage} alt="Preview Error" className="w-1/4 mx-auto" />
          <span className="text-sm text-center mt-6">
            Looks like there are no posts yet. Be the first to create one!
          </span>
        </div>
      )}
      <CreateComment {...props} />
    </div>
  );
};
