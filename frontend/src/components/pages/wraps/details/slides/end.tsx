import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import SpotifyLogo from "@/assets/spotify.png";

export const EndSlide = () => {
  return (
    <Card className="w-full min-h-[48rem] px-8 bg-primary flex flex-col items-center justify-center">
      <CardHeader className="text-center">
        <img
          src={SpotifyLogo}
          alt="Spotify Logo"
          className="mx-auto w-1/2 mb-12"
        />
        <CardTitle className="text-4xl font-bold text-primary-foreground">
          Thanks for watching!
        </CardTitle>
        <CardDescription className="text-primary-foreground">
          Check out an AI summary below
        </CardDescription>
      </CardHeader>
    </Card>
  );
};
