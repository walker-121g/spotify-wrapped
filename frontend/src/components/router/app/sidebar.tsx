import { useState } from "react";

import { Button } from "../../ui/button";

import { ArrowLeft } from "lucide-react";
import { NavLinks } from "./links";

export const Sidebar = () => {
  const [expanded, setExpanded] = useState<boolean>(true);

  return (
    <div
      className={`relative ${expanded ? "w-[30rem] p-8" : "w-16 p-3"} h-screen hidden sm:flex flex-col justify-between border-r transition-[width] duration-200`}
    >
      <div className="w-full flex flex-col gap-8">
        <div className={expanded ? "w-full flex flex-col" : "hidden"}>
          <h1 className="text-2xl font-bold">Wrapped</h1>
        </div>

        <NavLinks expanded={expanded} />
      </div>

      <Button
        variant="outline"
        size="icon"
        className="absolute rounded-full right-[-1rem] top-[calc(50%-1rem)]"
        onClick={() => setExpanded(!expanded)}
      >
        <ArrowLeft
          className={`${expanded ? "" : "rotate-180"} transition duration-200`}
        />
      </Button>
    </div>
  );
};
