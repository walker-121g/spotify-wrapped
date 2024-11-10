import { useQuery } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";

import { getSharedWraps } from "@/services/wrap.service";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { NoWraps } from "./no-wraps";

export const SharedWraps = () => {
  const router = useRouter();
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
          <Card
            key={wrap.name}
            onClick={() => {
              router.navigate({
                to: `/app/wraps/${wrap.id}`,
              });
            }}
            className="cursor-pointer"
          >
            <CardHeader>
              <CardTitle>{wrap.name}</CardTitle>
              <CardDescription>
                {wrap.period
                  .split("_")
                  .map((p) => `${p.charAt(0).toUpperCase()}${p.substring(1)}`)
                  .join(" ")}{" "}
                - {new Date(wrap.created_at).toLocaleDateString()}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <span className="text-sm">
                {wrap.artists.length} album{wrap.artists.length !== 1 && "s"} /{" "}
                {wrap.tracks.length} track{wrap.tracks.length !== 1 && "s"} /{" "}
                {wrap.users.length} user{wrap.users.length !== 1 && "s"}
              </span>
            </CardContent>
          </Card>
        ))}
    </div>
  ) : (
    <NoWraps />
  );
};
