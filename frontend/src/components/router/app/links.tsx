import { Link, useLocation } from "@tanstack/react-router";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

import { Home, User, Search, Mail, Music, Plus, Settings, Gamepad2 } from "lucide-react";

export const NavLink = ({
  expanded,
  locations,
  href,
  name,
  icon,
}: {
  expanded: boolean;
  locations: string[];
  href: string;
  name: string;
  icon: JSX.Element;
}) => {
  const location = useLocation();

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            asChild
            variant={
              locations.includes(location.pathname) ? "default" : "ghost"
            }
            size={expanded ? "default" : "icon"}
            className={expanded ? "justify-start" : ""}
          >
            <Link to={href}>
              {icon}
              <span className={expanded ? "" : "hidden"}>{name}</span>
            </Link>
          </Button>
        </TooltipTrigger>
        {!expanded && <TooltipContent side="right">{name}</TooltipContent>}
      </Tooltip>
    </TooltipProvider>
  );
};

export const NavLinks = ({ expanded }: { expanded: boolean }) => {
  return (
    <div className="flex flex-col gap-2">
      <NavLink
        expanded={expanded}
        locations={["/app/", "/app"]}
        href="/app"
        name="Home"
        icon={<Home />}
      />
      <NavLink
        expanded={expanded}
        locations={["/app/profile/", "/app/profile"]}
        href="/app/profile"
        name="My Profile"
        icon={<User />}
      />
      <NavLink
        expanded={expanded}
        locations={["/app/search/", "/app/search"]}
        href="/app/search"
        name="Search"
        icon={<Search />}
      />
      <NavLink
        expanded={expanded}
        locations={["/app/messages", "/app/messages/"]}
        href="/app/messages"
        name="Messages"
        icon={<Mail />}
      />
      <NavLink
        expanded={expanded}
        locations={["/app/games", "/app/games/"]}
        href="/app/games"
        name="Games"
        icon={<Gamepad2 />}
      />
      <div className="flex flex-col gap-2 my-4">
        <span className={`${expanded ? "text-md" : "text-xs"} font-semibold`}>
          Wraps
        </span>
        <NavLink
          expanded={expanded}
          locations={["/app/wraps/", "/app/wraps"]}
          href="/app/wraps"
          name="My Wraps"
          icon={<Music />}
        />
        <NavLink
          expanded={expanded}
          locations={["/app/wraps/new/", "/app/wraps/new"]}
          href="/app/wraps/new"
          name="New Wrap"
          icon={<Plus />}
        />
      </div>
      <NavLink
        expanded={expanded}
        locations={["/app/settings/", "/app/settings"]}
        href="/app/settings"
        name="Settings"
        icon={<Settings />}
      />
    </div>
  );
};
