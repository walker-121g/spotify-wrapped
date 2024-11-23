import { useQuery, useMutation } from "@tanstack/react-query";
import { useMemo } from "react";

import { getFollowing, follow, unfollow } from "@/services/social.service";
import { useContext } from "@/stores/user.store";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { CardTitle, CardDescription } from "@/components/ui/card";
import { Loader2, UserPlus, UserMinus } from "lucide-react";

export const Follow = ({
  user,
  description,
}: {
  user: {
    id: number;
    name: string;
    email: string;
  };
  description?: string;
}) => {
  const context = useContext();

  const { isLoading, data, refetch } = useQuery({
    queryKey: ["following"],
    queryFn: async () => getFollowing(),
  });

  const {
    isPending: followPending,
    isSuccess: followSuccess,
    isError: followError,
    mutate: followMutate,
  } = useMutation({
    mutationKey: ["following", "follow", user.id],
    mutationFn: async () => follow(user.email),
  });

  const {
    isPending: unfollowPending,
    isSuccess: unfollowSuccess,
    isError: unfollowError,
    mutate: unfollowMutate,
  } = useMutation({
    mutationKey: ["following", "unfollow", user.id],
    mutationFn: async () => unfollow(user.email),
  });

  useMemo(() => {
    if (followSuccess || unfollowSuccess) {
      refetch();
    }
  }, [followSuccess, unfollowSuccess]);

  return (
    <div className="flex flex-row items-center gap-2">
      <Avatar>
        <AvatarImage src="" alt="avatar" />
        <AvatarFallback>{user.name[0]}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col gap-1">
        <CardTitle>{user.name}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </div>
      {user.email !== context.user.email && (
        <Button
          disabled={followPending || unfollowPending || !data}
          onClick={() => {
            if (data) {
              if (
                data.filter((f) => f.following.email === user.email).length > 0
              ) {
                unfollowMutate();
              } else {
                followMutate();
              }
            }
          }}
          variant="outline"
          className="ml-2"
        >
          {followPending || unfollowPending || !data ? (
            <Loader2 className="animate-spin" />
          ) : data.filter((f) => f.following.email === user.email).length >
            0 ? (
            <UserMinus />
          ) : (
            <UserPlus />
          )}
          {data &&
          data.filter((f) => f.following.email === user.email).length > 0
            ? "Unfollow"
            : "Follow"}
        </Button>
      )}
    </div>
  );
};
