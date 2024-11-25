import { Link } from "@tanstack/react-router";
import { useAuth } from "@/stores/auth.store";
import { useContext } from "@/stores/user.store";

import { Button } from "../../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "../../ui/avatar";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useTheme } from "@/components/theme-provider";

import { Menu, Settings, LogOut, User, Sun } from "lucide-react";
import { NavLinks } from "./links";

export const Topbar = () => {
  const auth = useAuth();
  const context = useContext();
  const theme = useTheme();

  return (
    <div className="w-full p-8 flex flex-row justify-between items-center border-b">
      <Sheet>
        <SheetTrigger asChild className="md:invisible">
          <Button variant="outline" size="icon">
            <Menu />
          </Button>
        </SheetTrigger>
        <SheetContent
          side="left"
          className="flex flex-col gap-4 p-8 w-2/3 h-screen"
        >
          <SheetHeader>
            <SheetTitle>Wrapped</SheetTitle>
            <SheetClose />
          </SheetHeader>
          <NavLinks expanded={true} />
        </SheetContent>
      </Sheet>
      <div className="flex flex-row gap-4 items-center">
        <span className="text-lg font-semibold">
          Welcome back, {context.user?.display_name}
        </span>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="rounded-full">
              <Avatar>
                <AvatarImage
                  src={
                    context?.user?.images.length > 0
                      ? context?.user?.images[0].url
                      : ""
                  }
                  className="object-cover"
                />
                <AvatarFallback>
                  {context?.user?.display_name
                    ?.split(" ")
                    .map((name) => name[0])}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="bottom" className="mr-8 mt-2">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                theme.setTheme(theme.theme === "dark" ? "light" : "dark");
              }}
            >
              <Sun />
              <span>{theme.theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/app/profile">
                <User />
                <span>Profile</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/app/settings">
                <Settings />
                <span>Settings</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                auth.logout();
              }}
            >
              <LogOut />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
