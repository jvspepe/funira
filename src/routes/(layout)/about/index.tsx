import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(layout)/about/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/(layout)/about/"!</div>;
}
