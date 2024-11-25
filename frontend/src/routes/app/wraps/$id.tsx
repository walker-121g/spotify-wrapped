import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";

import { getWrap } from "@/services/wrap.service";

import { Loader2 } from "lucide-react";

import ErrorImage from "@/assets/undraw_error.svg";
import { WrapUsers } from "@/components/pages/wraps/details/users";
import { WrapSummary } from "@/components/pages/wraps/details/summary";
import { WrapSlides } from "@/components/pages/wraps/details/slides";

export const Route = createFileRoute("/app/wraps/$id")({
  component: WrapDetail,
});

function WrapDetail() {
  const { id } = Route.useParams() as {
    id: string;
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["wrap", id],
    queryFn: async () => await getWrap(Number(id)),
  });

  return isLoading ? (
    <div className="w-full flex flex-row items-center justify-center my-16">
      <Loader2 className="animate-spin" />
    </div>
  ) : error || !data ? (
    <div className="w-full flex flex-col gap-4 justify-center my-16">
      <img src={ErrorImage} alt="Preview Error" className="w-1/3 mx-auto" />
      <span className="text-sm text-center mt-4">
        There was an error loading your wrap.
      </span>
    </div>
  ) : (
    <div className="w-full flex flex-col gap-8">
      <WrapUsers wrap={data} />
      <WrapSlides wrap={data} />
      <WrapSummary wrap={data} />
    </div>
  );
}
