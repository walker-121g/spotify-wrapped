import { useQuery } from "@tanstack/react-query";

import { getSharedWraps } from "@/services/wrap.service";

import { Loader2 } from "lucide-react";
import { NoWraps } from "./no-wraps";
import { Wrap } from "./wrap";

export const SharedWraps = () => {
  const { isLoading, data } = useQuery({
    queryKey: ["shared", "wraps"],
    queryFn: async () => await getSharedWraps(),
  });

  return isLoading || !data ? (
    <div className="w-full flex flex-row justify-center my-16">
      <Loader2 className="animate-spin" />
    </div>
  ) : data.length > 0 ? (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {data
        .filter((wrap) => !wrap.users.some((user) => !user.accepted))
        .map((wrap) => (
          <Wrap key={wrap.id} wrap={wrap} />
        ))}
    </div>
  ) : (
    <NoWraps />
  );
};
