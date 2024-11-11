import { useMemo } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";

import { likePost, postIsLiked, unlikePost } from "@/services/social.service";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { Heart } from "lucide-react";

export const LikeButton = (props: { id: number; count?: number }) => {
  const { isPending, data, refetch } = useQuery({
    queryKey: ["postIsLiked", props.id],
    queryFn: async () => await postIsLiked(props.id),
  });

  const {
    isPending: likePending,
    isSuccess: likeSuccess,
    mutate: like,
  } = useMutation({
    mutationKey: ["likePost", props.id],
    mutationFn: async () => await likePost(props.id),
  });

  const {
    isPending: unlikePending,
    isSuccess: unlikeSuccess,
    mutate: unlike,
  } = useMutation({
    mutationKey: ["unlikePost", props.id],
    mutationFn: async () => await unlikePost(props.id),
  });

  useMemo(() => {
    if (likeSuccess || unlikeSuccess) {
      refetch();
    }
  }, [likeSuccess, unlikeSuccess]);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Button
            onClick={async () => {
              if (data) {
                unlike();
              } else {
                like();
              }
            }}
            disabled={isPending || likePending || unlikePending}
            variant="ghost"
            size={props.count !== undefined ? undefined : "icon"}
          >
            <Heart className={`text-primary ${data && "fill-primary"}`} />
            {props.count && props.count}
          </Button>
        </TooltipTrigger>
        <TooltipContent>{data ? "Unlike" : "Like"}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
