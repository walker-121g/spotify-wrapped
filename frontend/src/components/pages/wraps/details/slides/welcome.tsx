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
          From{" "}
          {new Date(
            Date.parse(wrap.created_at) -
              (wrap.period === "short_term"
                ? 1000 * 60 * 60 * 24 * 7 * 4
                : wrap.period === "medium_term"
                  ? 1000 * 60 * 60 * 24 * 7 * 4 * 6
                  : 1000 * 60 * 60 * 24 * 7 * 4 * 12),
          ).toLocaleDateString()}{" "}
          to {new Date(wrap.created_at).toLocaleDateString()}
        </CardDescription>
      </CardHeader>
    </Card>
  );
};
