import { useRef, useCallback, MutableRefObject } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";

import { getPosts } from "@/services/social.service";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Loader2 } from "lucide-react";

import { NoPosts } from "./no-posts";
import { NoMorePosts } from "./no-more-posts";

export const RecentPosts = () => {
  const router = useRouter();
  const { isLoading, isRefetching, isError, hasNextPage, fetchNextPage, data } =
    useInfiniteQuery({
      queryKey: ["posts"],
      queryFn: ({ pageParam }) => getPosts(pageParam),
      initialPageParam: 0,
      getNextPageParam: (...params) =>
        params[0].length === 10 ? params[2] + 1 : undefined,
      getPreviousPageParam: (...params) =>
        params[2] > 0 ? params[2] - 1 : undefined,
    });

  const observer: MutableRefObject<IntersectionObserver | null> =
    useRef<IntersectionObserver>(null);
  const lastElementRef = useCallback(
    (node: HTMLElement | null) => {
      if (isLoading || isRefetching) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, hasNextPage, fetchNextPage, isRefetching],
  );

  return isLoading || !data ? (
    <div className="w-full flex flex-row justify-center my-16">
      <Loader2 className="animate-spin" />
    </div>
  ) : !isError && data.pages.length > 0 ? (
    <div className="w-full flex flex-col gap-4">
      {data.pages.map((page, i) => (
        <div key={i} className="w-full flex flex-col gap-4">
          {page.map((post, j) => (
            <Card
              key={post.id}
              onClick={() =>
                router.navigate({
                  to: `/app/posts/${post.id}`,
                })
              }
              ref={
                i === data.pages.length - 1 && j === page.length - 1
                  ? lastElementRef
                  : null
              }
            >
              <CardHeader>
                <CardTitle>{post.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{post.content}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      ))}
      {isRefetching && (
        <div className="w-full flex flex-row justify-center my-16">
          <Loader2 className="animate-spin" />
        </div>
      )}
      {!hasNextPage && <NoMorePosts />}
    </div>
  ) : (
    <NoPosts />
  );
};
