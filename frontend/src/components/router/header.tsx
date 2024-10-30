import { Link } from "@tanstack/react-router";

import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { 
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "@/stores/auth.store"; // for the logout i think
import { useContext } from "@/stores/user.store";

export const Header = () => {
  const { user, clearUser, setUser } = useContext();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const response = await fetch("/api/spotify/profile/", {
          method: "GET",
          credentials: "include", // ensures cookies are included for authentication if needed
        });
        if (response.ok) {
          const profile = await response.json();
          setUser(profile);
        } else {
          console.error("Failed to fetch profile:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchProfile();
  }, [setUser, user]);

  return (
    <header className="absolute w-full flex flex-row justify-between items-center p-6 px-24 border-b">
      <h1 className="text-xl font-bold">Wrapped</h1>
      <nav className="hidden sm:flex flex-row items-center">
        <Button asChild variant="link">
          <Link href="/">Home</Link>
        </Button>
        <Button asChild variant="link">
          <Link href="/demo">Demo</Link>
        </Button>
        <Button asChild variant="link">
          <Link href="/about">About</Link>
        </Button>
        <Button asChild variant="link">
          <Link href="/contact-us">Contact Us</Link>
        </Button>
      </nav>

      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="cursor-pointer">
              <AvatarImage src={user.images[0]?.url} alt="Profile Picture" />
              <AvatarFallback>{user.display_name[0]}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48 p-2">
            <DropdownMenuLabel>{user.display_name}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => {
              useAuth.getState().logout();
              clearUser();
            }}>
              Log Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button asChild className="hidden sm:flex">
          <Link href="/login">Login</Link>
        </Button>
      )}

      <Drawer direction="left">
        <DrawerTrigger asChild className="sm:hidden">
          <Button variant="outline" size="icon">
            <Menu />
          </Button>
        </DrawerTrigger>
        <DrawerContent className="flex flex-col gap-4 p-8 w-2/3 h-screen">
          <DrawerHeader>
            <DrawerTitle>Spotify Wrapped</DrawerTitle>
            <DrawerDescription>CS 2340 - Group 46</DrawerDescription>
            <DrawerClose asChild className="absolute top-4 right-4">
              <Button variant="outline" size="icon">
                <X />
              </Button>
            </DrawerClose>
          </DrawerHeader>
          <div className="flex flex-col gap-2 mt-4">
            <Button asChild variant="ghost">
              <Link href="/">Home</Link>
            </Button>
            <Button asChild variant="ghost">
              <Link href="/demo">Demo</Link>
            </Button>
            <Button asChild variant="ghost">
              <Link href="/about">About</Link>
            </Button>
            <Button asChild variant="ghost">
              <Link href="/contact-us">Contact Us</Link>
            </Button>
          </div>
          <DrawerFooter>
            <Button asChild>
              <Link href="/login">Login</Link>
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </header>
  );
};
