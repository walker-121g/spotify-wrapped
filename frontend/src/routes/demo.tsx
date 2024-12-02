import { createFileRoute } from "@tanstack/react-router";

import { Header } from "@/components/router/header";

export const Route = createFileRoute("/demo")({
  component: () => <DemoPage />,
});

function DemoPage() {
  return (
    <div className="w-screen h-screen flex flex-col">
      <Header />
      <main className="w-screen h-screen flex flex-col items-center justify-center text-center p-24">
        <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold">
          Project Demo
        </h1>
        <p className="text-xs md:text-sm mt-4 mb-8">
          Watch the video below for a quick video-tutorial on how to use this
          website.
        </p>
        <iframe
          className="w-screen sm:w-4/5 md:w-1/2 md:h-96 rounded-md border"
          src="https://drive.google.com/file/d/1P5HpPSiOGi_9nph4gASziA4WfgIbDqeN/preview"
          allow="autoplay"
        ></iframe>
      </main>
    </div>
  );
}
