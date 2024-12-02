import { useInView } from "react-intersection-observer";
import { useEffect, useRef } from "react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import { Wrap, WrapPreview } from "@/services/types/wrap";

export const MostPlayedSlide = ({
  wrap,
  info,
}: {
  wrap: Wrap;
  info: WrapPreview;
}) => {
  const { ref, inView } = useInView();
  const audioRef = useRef<HTMLVideoElement>(null);
  const spotify = info.tracks.find((t) => t.id === wrap.tracks[0].track)!;

  useEffect(() => {
    if (inView) {
      audioRef.current!.play();
    } else {
      audioRef.current!.pause();
    }
  }, [inView]);

  return (
    <Card ref={ref} className="w-full min-h-[48rem] sm:px-16 flex flex-col">
      <CardHeader className="flex flex-col gap-4 text-center">
        <CardTitle className="text-3xl font-bold my-24 animate-in">
          Top Played Song
        </CardTitle>
        <div className="w-full flex flex-row gap-2 items-center justify-center mt-16 mb-4">
          <img
            src={spotify.album.images[0].url}
            alt="Track Icon"
            className="w-1/5 rounded-full"
          />
          <img
            src={spotify.album.images[0].url}
            alt="Track Icon"
            className="w-1/3 rounded-full animate-[spin_10s_linear_infinite]"
          />
          <img
            src={spotify.album.images[0].url}
            alt="Track Icon"
            className="w-1/5 rounded-full rotate-180"
          />
        </div>
        <CardDescription className="text-center px-8">
          Your most played song was {spotify.name} by {spotify.artists[0].name}
        </CardDescription>
        <CardDescription className="text-center px-8">
          Album: {spotify.album.name}
        </CardDescription>
      </CardHeader>
      <video ref={audioRef} hidden loop>
        <source src={spotify.preview_url} />
      </video>
    </Card>
  );
};
