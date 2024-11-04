import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app/wraps/")({
  component: WrapsPage,
});

function WrapsPage() {
  return <></>;
}
