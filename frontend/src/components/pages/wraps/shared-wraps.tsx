import { useQuery } from "@tanstack/react-query";

import { getSharedWraps } from "@/services/wrap.service";

import { Loader2 } from "lucide-react";
import { NoWraps } from "./no-wraps";
import { Wrap } from "./wrap";
import { useContext } from "@/stores/user.store";

export const SharedWraps = () => {
  const context = useContext();
  const { isLoading, data, refetch } = useQuery({
    queryKey: ["shared", "wraps"],
    queryFn: async () => await getSharedWraps(),
  });

  return isLoading || !data ? (
    <div className="w-full flex flex-row justify-center my-16">
      <Loader2 className="animate-spin" />
    </div>
  ) : data.length > 0 ? (
    <div className="flex flex-col gap-8">
      {data.filter((wrap) =>
        wrap.users.some(
          (user) => !user.accepted && user.email === context.user!.email,
        ),
      ).length > 0 && (
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold">Requires Approval</h1>
            <p className="text-foreground-muted text-sm">
              These wraps are shared with you and require your approval to be
              visible to others.
            </p>
          </div>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data
              .filter((wrap) =>
                wrap.users.some(
                  (user) =>
                    !user.accepted && user.email === context.user!.email,
                ),
              )
              .map((wrap) => (
                <Wrap key={wrap.id} wrap={wrap} refetch={refetch} acceptable />
              ))}
          </div>
        </div>
      )}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold">Shared With Me</h1>
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data
            .filter((wrap) => !wrap.users.some((user) => !user.accepted))
            .map((wrap) => (
              <Wrap key={wrap.id} wrap={wrap} refetch={refetch} />
            ))}
        </div>
      </div>
    </div>
  ) : (
    <NoWraps />
  );
};
