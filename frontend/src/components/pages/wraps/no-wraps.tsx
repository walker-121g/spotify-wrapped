import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

import ErrorImage from "@/assets/undraw_error.svg";

export const NoWraps = () => {
  return (
    <div className="w-full flex flex-col items-center gap-4 my-16">
      <img src={ErrorImage} alt="Preview Error" className="w-1/3 mx-auto" />
      <span className="text-sm text-center mt-4">
        Looks like you don't have any wraps yet.
      </span>
      <Button asChild className="w-fit">
        <Link to="/app/wraps/new">Create a Wrap</Link>
      </Button>
    </div>
  );
};
