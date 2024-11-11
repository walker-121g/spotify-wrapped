import PostsImage from "@/assets/undraw_posts.svg";

export const NoMorePosts = () => {
  return (
    <div className="w-full flex flex-col items-center gap-4 my-16">
      <img src={PostsImage} alt="Posts" className="w-1/4 mx-auto" />
      <span className="text-sm text-center mt-4">
        Looks like there are no more posts to show. Try again later.
      </span>
    </div>
  );
};
