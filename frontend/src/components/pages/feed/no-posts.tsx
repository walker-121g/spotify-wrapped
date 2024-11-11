import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

import ErrorImage from "@/assets/undraw_error.svg";

export const NoPosts = () => {
  return (
    <div className="w-full flex flex-col items-center gap-4 my-16">
      <img src={ErrorImage} alt="Preview Error" className="w-1/3 mx-auto" />
      <span className="text-sm text-center mt-4">
        Looks like there are no posts yet. Be the first to create one!
      </span>
      <Button asChild className="w-fit">
        <Link to="/app/wraps">Create a Post</Link>
      </Button>
    </div>
  );
};
