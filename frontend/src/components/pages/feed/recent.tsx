import { useRef, useCallback, MutableRefObject } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";

import { getPosts } from "@/services/social.service";

import { Loader2 } from "lucide-react";

import { NoPosts } from "./no-posts";
import { NoMorePosts } from "./no-more-posts";
import { PostPreview } from "./post/preview";

export const RecentPosts = () => {
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
  ) : !isError && data.pages.length > 0 && data.pages[0].length > 0 ? (
    <div className="w-full flex flex-col gap-4">
      {data.pages.map((page, i) => (
        <div key={i} className="w-full flex flex-col gap-4">
          {page.map((post, j) => (
            <PostPreview
              post={post}
              key={j}
              ref={
                i === data.pages.length - 1 && j === page.length - 1
                  ? lastElementRef
                  : undefined
              }
            />
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
