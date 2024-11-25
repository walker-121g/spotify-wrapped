import { useInView } from "react-intersection-observer";
import { useEffect, useRef } from "react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import { Wrap, WrapPreview } from "@/services/types/wrap";

export const TopTracksSlide = ({ info }: { wrap: Wrap; info: WrapPreview }) => {
  const { ref, inView } = useInView();
  const audioRef = useRef<HTMLVideoElement>(null);

  const indeces = [];
  for (let i = 0; i < Math.min(info.tracks.length, 5); i++) {
    indeces.push(i);
  }

  const randomTrack =
    info.tracks[indeces[Math.floor(Math.random() * indeces.length)]];

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
        <CardTitle className="text-3xl font-bold mt-16 mb-4">
          Top 5 Tracks
        </CardTitle>
        <div className="grid grid-cols-2 gap-4 items-center justify-center">
          {indeces.map((index) => (
            <div className="w-full flex flex-col gap-2 self-center first:col-span-2">
              <img
                src={info.tracks[index].album.images[0].url}
                alt="Album Icon"
                className="w-1/2 rounded-md mx-auto"
              />
              <CardDescription className="text-center">
                {info.tracks[index].name} - {info.tracks[index].artists[0].name}
              </CardDescription>
            </div>
          ))}
        </div>
      </CardHeader>
      <video ref={audioRef} hidden loop>
        <source src={randomTrack.preview_url} />
      </video>
    </Card>
  );
};
