import { useQuery } from "@tanstack/react-query";

import { getWrapInfo } from "@/services/wrap.service";

import { Loader2 } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { Wrap } from "@/services/types/wrap";

import ErrorImage from "@/assets/undraw_friends.svg";
import { WelcomeSlide } from "./slides/welcome";
import { MostPlayedSlide } from "./slides/most-played";
import { GenreSlide } from "./slides/genres";
import { TopArtistSlide } from "./slides/top-artist";
import { RandomTracksSlide } from "./slides/random";
import { TopTracksSlide } from "./slides/top-tracks";
import { TopArtistsSlide } from "./slides/top-artists";
import { EndSlide } from "./slides/end";

export const WrapSlides = ({ wrap }: { wrap: Wrap }) => {
  const { isLoading, isError, data } = useQuery({
    queryKey: ["wrap", "spotify", wrap.id],
    queryFn: async () => await getWrapInfo(wrap),
  });

  if (isLoading) {
    return (
      <div className="w-full flex flex-col gap-2">
        <h1 className="text-text text-md font-semibold">Wrap Slides</h1>
        <div className="w-full flex flex-row items-center justify-center my-8">
          <Loader2 className="animate-spin" />
        </div>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="w-full flex flex-col gap-2">
        <h1 className="text-text text-md font-semibold">Wrap Slides</h1>
        <div className="w-full flex flex-col gap-2 justify-center my-8">
          <img src={ErrorImage} alt="Preview Error" className="w-1/3 mx-auto" />
          <span className="text-sm text-center mt-4">
            Looks like you don't have any wraps yet.
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-2">
      <h1 className="text-text text-md font-semibold">Wrap Slides</h1>
      <Carousel className="w-full sm:w-2/3 md:w-[25rem] lg:w-[35rem] min-h-[48rem] mx-auto my-8">
        <CarouselContent>
          <CarouselItem>
            <WelcomeSlide wrap={wrap} />
          </CarouselItem>
          <CarouselItem>
            <MostPlayedSlide wrap={wrap} info={data} />
          </CarouselItem>
          <CarouselItem>
            <GenreSlide wrap={wrap} info={data} />
          </CarouselItem>
          <CarouselItem>
            <TopArtistSlide wrap={wrap} info={data} />
          </CarouselItem>
          <CarouselItem>
            <RandomTracksSlide wrap={wrap} info={data} />
          </CarouselItem>
          <CarouselItem>
            <TopTracksSlide wrap={wrap} info={data} />
          </CarouselItem>
          <CarouselItem>
            <TopArtistsSlide wrap={wrap} info={data} />
          </CarouselItem>
          <CarouselItem>
            <EndSlide />
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};
