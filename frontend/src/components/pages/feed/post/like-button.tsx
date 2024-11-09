import { useQuery, useMutation } from "@tanstack/react-query";

import { likePost, postIsLiked } from "@/services/social.service";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { Heart } from "lucide-react";

export const LikeButton = (props: { id: number }) => {
  const { isPending, data, refetch } = useQuery({
    queryKey: ["postIsLiked", props.id],
    queryFn: async () => await postIsLiked(props.id),
  });

  const { mutate: like } = useMutation({
    mutationKey: ["likePost", props.id],
    mutationFn: async () => await likePost(props.id),
  });

  const { mutate: unlike } = useMutation({
    mutationKey: ["unlikePost", props.id],
    mutationFn: async () => await likePost(props.id),
  });

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Button
            onClick={() => {
              if (data) {
                unlike();
              } else {
                like();
              }
              refetch();
            }}
            disabled={isPending}
            variant="ghost"
            size="icon"
          >
            <Heart className={`text-primary ${data && "fill-primary"}`} />
          </Button>
        </TooltipTrigger>
        <TooltipContent>{data ? "Unlike" : "Like"}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
