import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import { Wrap } from "@/services/types/wrap";

import SpotifyLogo from "@/assets/spotify.png";

export const WelcomeSlide = ({ wrap }: { wrap: Wrap }) => {
  return (
    <Card className="w-full min-h-[48rem] px-8 bg-primary flex flex-col items-center justify-center">
      <CardHeader className="text-center">
        <img
          src={SpotifyLogo}
          alt="Spotify Logo"
          className="mx-auto w-1/2 mb-12"
        />
        <CardTitle className="text-4xl font-bold text-primary-foreground">
          Welcome to {wrap.name}
        </CardTitle>
        <CardDescription className="text-primary-foreground">
          From 11/23/24 to 12/32/43
        </CardDescription>
      </CardHeader>
    </Card>
  );
};
