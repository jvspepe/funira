import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/(layout)/(auth)")({
  beforeLoad: ({ context }) => {
    if (context.session) {
      // oxlint-disable-next-line typescript/only-throw-error
      throw redirect({ to: "/" });
    }
  },

  component: RouteComponent,
});

function RouteComponent() {
  return <Outlet />;
}
