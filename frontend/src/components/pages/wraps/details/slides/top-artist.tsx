import { useInView } from "react-intersection-observer";
import { useEffect, useRef } from "react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import { Wrap, WrapPreview } from "@/services/types/wrap";

export const TopArtistSlide = ({
  wrap,
  info,
}: {
  wrap: Wrap;
  info: WrapPreview;
}) => {
  const { ref, inView } = useInView();
  const audioRef = useRef<HTMLVideoElement>(null);

  const spotify = info.artists.find((a) => a.id === wrap.artists[0].artist)!;
  const tracks = info.tracks.filter(
    (t) => t.artists.filter((a) => a.name === spotify.name).length > 0,
  );
  const randomTrack = tracks[Math.floor(Math.random() * tracks.length)];

  useEffect(() => {
    if (inView) {
      audioRef.current!.play();
    } else {
      audioRef.current!.pause();
    }
  }, [inView]);

  return (
    <Card ref={ref} className="w-full min-h-[48rem] px-16 flex flex-col">
      <CardHeader className="flex flex-col gap-4 text-center">
        <CardTitle className="text-3xl font-bold my-24 animate-in">
          {spotify.name}
        </CardTitle>
        <div className="w-full flex flex-row gap-2 items-center justify-center mt-16 mb-4">
          <img
            src={spotify.images[0].url}
            alt="Artist Icon"
            className="w-1/2 rounded-md"
          />
        </div>
        <CardDescription className="text-center px-8">
          {spotify.name} is your most listened to artist!
        </CardDescription>
        <CardDescription className="text-center px-8">
          Some of their genres include {spotify.genres.join(", ")}.
        </CardDescription>
        <div className="w-full flex flex-row gap-2 items-center justify-center">
          <img
            src={
              spotify.images[Math.floor(Math.random() * spotify.images.length)]
                .url
            }
            alt="Artist Icon"
            className="w-1/6 rounded-full"
          />
          <img
            src={
              spotify.images[Math.floor(Math.random() * spotify.images.length)]
                .url
            }
            alt="Artist Icon"
            className="w-1/6 rounded-full"
          />
        </div>
      </CardHeader>
      <video ref={audioRef} hidden loop>
        <source src={randomTrack.preview_url} />
      </video>
    </Card>
  );
};
