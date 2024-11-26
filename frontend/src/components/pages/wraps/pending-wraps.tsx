import { useQuery } from "@tanstack/react-query";

import { getWraps } from "@/services/wrap.service";

import { Loader2 } from "lucide-react";
import { NoWraps } from "./no-wraps";
import { Wrap } from "./wrap";

export const PendingWraps = () => {
  const { isLoading, data, refetch } = useQuery({
    queryKey: ["my", "wraps"],
    queryFn: async () => await getWraps(),
  });

  return isLoading || !data ? (
    <div className="w-full flex flex-row justify-center my-16">
      <Loader2 className="animate-spin" />
    </div>
  ) : data.filter(
      (wrap) => wrap.users.filter((user) => !user.accepted).length > 0,
    ).length > 0 ? (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {data
        .filter(
          (wrap) => wrap.users.filter((user) => !user.accepted).length > 0,
        )
        .map((wrap) => (
          <Wrap key={wrap.id} wrap={wrap} refetch={refetch} />
        ))}
    </div>
  ) : (
    <NoWraps />
  );
};
