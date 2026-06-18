import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/(admin-layout)/orders/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/admin/(admin-layout)/orders/"!</div>;
}
