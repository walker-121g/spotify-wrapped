import { createFileRoute } from "@tanstack/react-router";

import { Header } from "@/components/router/header";

export const Route = createFileRoute("/about")({
  component: () => <AboutPage />,
});

function AboutPage() {
  return (
    <div className="w-screen h-screen flex flex-col">
      <Header />
    </div>
  );
}
