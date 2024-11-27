import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import { Wrap, WrapPreview } from "@/services/types/wrap";

import MusicImage from "@/assets/undraw_music.svg";

export const GenreSlide = ({ info }: { wrap: Wrap; info: WrapPreview }) => {
  const genres = info.artists.map((artist) => artist.genres).flat();

  return (
    <Card className="w-full min-h-[48rem] px-16 flex flex-col">
      <CardHeader className="flex flex-col gap-4 text-center">
        <CardTitle className="text-3xl font-bold my-24 animate-in">
          You're a {genres[0]} fan!
        </CardTitle>
        <img
          src={MusicImage}
          alt="Music Icon"
          className="w-full mx-auto my-16"
        />
        <CardDescription className="text-center px-8 my-4">
          You listened to a total of {genres.length} genres!
        </CardDescription>
      </CardHeader>
    </Card>
  );
};
