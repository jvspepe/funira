import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/(admin-layout)/dashboard/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/admin/(admin-layout)/dashboard/"!</div>;
}
