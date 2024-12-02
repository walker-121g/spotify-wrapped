import { useInView } from "react-intersection-observer";
import { useEffect, useRef } from "react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import { Wrap, WrapPreview } from "@/services/types/wrap";

export const SharedMostPlayedSlide = ({
  wrap,
  info,
}: {
  wrap: Wrap;
  info: WrapPreview;
}) => {
  const { ref, inView } = useInView();
  const audioRef = useRef<HTMLVideoElement>(null);

  const commonTrack = info.tracks.find((track) =>
    wrap.tracks.every((userTrack) => userTrack.track === track.id),
  );

  useEffect(() => {
    /*if (inView) {
      audioRef.current!.play();
    } else {
      audioRef.current!.pause();
    }*/
  }, [inView]);

  if (!commonTrack) {
    return (
      <Card ref={ref} className="w-full min-h-[48rem] px-16 flex flex-col">
        <CardHeader className="flex flex-col gap-4 text-center">
          <CardTitle className="text-3xl font-bold my-24 animate-in">
            No Common Tracks
          </CardTitle>
          <CardDescription className="text-center px-8">
            The users in this wrap do not have any common top tracks.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card ref={ref} className="w-full min-h-[48rem] sm:px-16 flex flex-col">
      <CardHeader className="flex flex-col gap-4 text-center">
        <CardTitle className="text-3xl font-bold my-24 animate-in">
          Most Played Song
        </CardTitle>
        <div className="w-full flex flex-row gap-2 items-center justify-center mt-16 mb-4">
          <img
            src={commonTrack.album.images[0].url}
            alt="Track Icon"
            className="w-1/5 rounded-full"
          />
          <img
            src={commonTrack.album.images[0].url}
            alt="Track Icon"
            className="w-1/3 rounded-full animate-[spin_10s_linear_infinite]"
          />
          <img
            src={commonTrack.album.images[0].url}
            alt="Track Icon"
            className="w-1/5 rounded-full rotate-180"
          />
        </div>
        <CardDescription className="text-center px-8">
          The most played song among users is <b>{commonTrack.name}</b> by{" "}
          <b>{commonTrack.artists[0].name}</b>.
        </CardDescription>
        <CardDescription className="text-center px-8">
          Album: {commonTrack.album.name}
        </CardDescription>
      </CardHeader>
      <video ref={audioRef} hidden loop>
        <source src={commonTrack.preview_url} />
      </video>
    </Card>
  );
};
