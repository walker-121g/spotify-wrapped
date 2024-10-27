import { createFileRoute } from "@tanstack/react-router";

import { Header } from "@/components/router/header";

export const Route = createFileRoute("/contact-us")({
  component: () => <ContactUsPage />,
});

function ContactUsPage() {
  return (
    <div className="w-screen h-screen flex flex-col">
      <Header />
    </div>
  );
}
