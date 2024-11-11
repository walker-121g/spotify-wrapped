import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Fullscreen } from "lucide-react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { getWraps } from "@/services/wrap.service";

export const Route = createFileRoute("/app/wraps/$wrapId")({
  component: WrapDetail,
});

function WrapDetail() {
  const { wrapId } = Route.useParams() as {
    wrapId: string;
  };

  const {
    data: wraps,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["wraps"],
    queryFn: async () => await getWraps(),
  });

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  if (isLoading) {
    return <div>Loading wrap details...</div>;
  }

  if (error || !wraps || wraps.length === 0) {
    return <div>Error loading wrap details. Please try again.</div>;
  }

  const wrap = wraps.find((wrap) => wrap.id === Number(wrapId));
  if (!wrap) {
    return <div>Wrap not found!</div>;
  }

  const totalSlides = 8;
  //const backgroundImages = [
  //  "url-to-image-1.jpg", // replace with actual URLs or dynamic sources (i think for now, basic solid color BGs work)
  //  "url-to-image-2.jpg",
  //  "url-to-image-3.jpg",
  //  "url-to-image-4.jpg",
  //  "url-to-image-5.jpg",
  //  "url-to-image-6.jpg",
  //  "url-to-image-7.jpg",
  //  "url-to-image-8.jpg",
  //];

  const backgroundColors = ["#f46ebe", "#96f0b6", "#202f72", "#6a00ba", "#ff8b1c", "#ebf55e", "#ff5a49", "#c6dffb"]; // for the bg colors as opposed to images
  const slideData = [ // all of these need actual data, but yeah idk how to really retrieve it :/
    { title: "My Top Genres", value: 0}, // 
    { title: "Most Listened Countries", value: 0}, // maybe top 5? maybe just top 1
    { title: "You played X songs", description: "That's a total of $MINUTES$ minutes", value: 0}, // X = total songs played. im hoping we can find the total minutes listened as well.
    { title: "Your top song was $Top Track$ by $Artist$", description: "You played it $PLAYS$ times. That's $MINUTES$ minutes, and it still sounds perfect.", value: 0}, // (times played * track length)
    { title: "My Top Tracks", value: 0}, // top 5, we can include the cover art, artist name (and maybe album name) for each one
    { title: "Say hello to your top artist, $Top Artist$", description: "You spent $MINUTES$ minutes together, more than any of your $numArtists?$ other artists.", value: 0 }, // can also include number of plays
    { title: "My Top Artists", value: 0}, // top 5 artists, maybe also include total i.e. "you listened to X artists this year, but one came out on top"
    { value: 0}, // potentially include everything (top artists, top songs, minutes listened, and top genre)
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  return (
    <div className="wrap-detail">
      <header className="flex justify-between items-center p-4">
        <h1>{wrap.name}</h1>
        <Button
          variant="outline"
          onClick={() => setIsFullscreen(!isFullscreen)}
          className="fullscreen-toggle"
        >
          <Fullscreen />
          {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
        </Button>
      </header>

      <div className={`content ${isFullscreen ? "fullscreen" : ""}`}>
        <div
          className="slide"
          style={{
            // backgroundImage: `url(${backgroundImages[currentSlide]})`, // for if we decide we want to swap to images
            // backgroundSize: "cover",
            // backgroundPosition: "center",
            backgroundColor: backgroundColors[currentSlide], // using this for now, if we use images we can delete this
          }}
        >
          <h2>{slideData[currentSlide].title}</h2>
          <p>{slideData[currentSlide].value}</p>
        </div>

        <div className="slide-navigation">
          <Button onClick={prevSlide}>Previous</Button>
          <Button onClick={nextSlide}>Next</Button>
        </div>

        {isFullscreen && (
          <Button
            variant="outline"
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="exit-fullscreen-btn"
          >
            <X />
          </Button>
        )}
      </div>

      <style>{`
        .content {
          transition: all 0.3s ease;
          position: relative;
        }
        .fullscreen {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: white;
          z-index: 1000;
          padding: 16px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .slide {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100%;
          color: white;
          text-shadow: 0px 0px 10px rgba(0, 0, 0, 0.8);
          padding: 20px;
        }
        .slide h2 {
          font-size: 2rem;
        }
        .slide p {
          font-size: 1.5rem;
        }
        .slide-navigation {
          margin-top: 16px;
          display: flex;
          justify-content: space-between;
        }

        .exit-fullscreen-btn {
        position: absolute;
        top: 16px;
        right: 16px;
        z-index: 1100;
        background: rgba(0, 0, 0, 0.4);
        color: white;
        opacity: 0.7;
        border-radius: 12px;
        padding: 8px 12px;
        transition: opacity 0.3s ease;
        }

        .exit-fullscreen-btn:hover {
          opacity: 1;
          background: rgba(0, 0, 0, 0.6);
        }
      `}</style>
    </div>
  );
}
