import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/(admin-layout)/users/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/admin/(admin-layout)/users/"!</div>;
}
