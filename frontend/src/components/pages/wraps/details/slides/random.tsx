import { useInView } from "react-intersection-observer";
import { useEffect, useRef } from "react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import { Wrap, WrapPreview } from "@/services/types/wrap";

const randomIndeces = (arrayLength: number, length: number) => {
  const maxLength = Math.min(length, arrayLength);
  const indices = [];
  const usedIndices = new Set();

  while (indices.length < maxLength) {
    const randomIndex = Math.floor(Math.random() * arrayLength);
    if (!usedIndices.has(randomIndex)) {
      usedIndices.add(randomIndex);
      indices.push(randomIndex);
    }
  }

  return indices;
};

export const RandomTracksSlide = ({
  info,
}: {
  wrap: Wrap;
  info: WrapPreview;
}) => {
  const { ref, inView } = useInView();
  const audioRef = useRef<HTMLVideoElement>(null);

  const indeces = randomIndeces(info.tracks.length, 5);
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
          Random Tracks
        </CardTitle>
        <div className="grid grid-cols-2 gap-4 items-center justify-center">
          {indeces.map((index) => (
            <div className="w-full flex flex-col gap-2 self-center odd:last:col-span-2">
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
