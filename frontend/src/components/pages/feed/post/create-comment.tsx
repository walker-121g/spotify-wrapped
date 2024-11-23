import { useMemo, useState } from "react";
import { useMutation } from "@tanstack/react-query";

import { comment } from "@/services/social.service";

import { PostDetail } from "@/services/types/social";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";

export const CreateComment = (props: {
  post: PostDetail;
  refetch?: () => void;
}) => {
  const [content, setContent] = useState<string>("");

  const { isPending, isSuccess, mutate } = useMutation({
    mutationKey: ["post", "comment"],
    mutationFn: async () =>
      await comment({
        id: props.post.id,
        content,
      }),
  });

  useMemo(() => {
    if (isSuccess) {
      setContent("");
      if (props.refetch) {
        props.refetch();
      }
    }
  }, [isSuccess]);

  return (
    <div className="w-full flex flex-row gap-4">
      <Input
        className="w-full"
        placeholder="Leave a comment..."
        value={content}
        onChange={(value) => setContent(value.target.value)}
      />
      <Button onClick={() => mutate()} disabled={isPending}>
        {isPending && <Loader2 className="animate-spin" />}
        Comment
      </Button>
    </div>
  );
};
