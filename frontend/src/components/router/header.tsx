import { Link } from "@tanstack/react-router";

import { Button } from "../ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Menu } from "lucide-react";

export const Header = () => {
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

      <Button asChild className="hidden sm:flex">
        <Link href="/login">Login</Link>
      </Button>

      <Sheet>
        <SheetTrigger asChild className="sm:hidden">
          <Button variant="outline" size="icon">
            <Menu />
          </Button>
        </SheetTrigger>
        <SheetContent
          side="right"
          className="flex flex-col gap-4 p-8 w-2/3 h-screen"
        >
          <SheetHeader>
            <SheetTitle>Spotify Wrapped</SheetTitle>
            <SheetDescription>CS 2340 - Group 46</SheetDescription>
            <SheetClose />
          </SheetHeader>
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
          <SheetFooter>
            <Button asChild>
              <Link href="/login">Login</Link>
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </header>
  );
};
