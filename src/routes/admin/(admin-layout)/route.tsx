import { Box, Button, Flex, Icon, Menu, Separator } from "@chakra-ui/react";
import {
  createFileRoute,
  linkOptions,
  Link as RouterLink,
  Outlet,
} from "@tanstack/react-router";
import {
  ChevronUpIcon,
  LayoutDashboardIcon,
  LogOutIcon,
  PackageIcon,
  SettingsIcon,
  SofaIcon,
  TagIcon,
  UsersIcon,
} from "lucide-react";

import { ColorModeButton } from "@/components/ui/color-mode";

const routes = linkOptions([
  {
    icon: <LayoutDashboardIcon />,
    label: "Home",
    to: "/admin/dashboard",
  },
  {
    icon: <SofaIcon />,
    label: "Products",
    to: "/admin/products",
  },
  {
    icon: <TagIcon />,
    label: "Categories",
    to: "/admin/categories",
  },
  {
    icon: <PackageIcon />,
    label: "Orders",
    to: "/admin/orders",
  },
  {
    icon: <UsersIcon />,
    label: "Users",
    to: "/admin/users",
  },
]);

export const Route = createFileRoute("/admin/(admin-layout)")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Flex height="svh" overflow="hidden">
      <Flex direction="column" borderRightWidth="1px" minWidth="80">
        <Flex padding="2">
          <Button asChild variant="ghost" justifyContent="start" width="full">
            <RouterLink to="/admin/dashboard">Funira</RouterLink>
          </Button>
        </Flex>
        <Separator />
        <Flex direction="column" padding="2" align="start" flexGrow="1">
          {routes.map((route) => (
            <Button
              key={route.to}
              asChild
              variant="ghost"
              justifyContent="start"
              width="full"
            >
              <RouterLink to={route.to}>
                <Icon>{route.icon}</Icon>
                {route.label}
              </RouterLink>
            </Button>
          ))}
        </Flex>
        <Separator />
        <Flex direction="column" padding="2">
          <Menu.Root positioning={{ placement: "right-start" }}>
            <Menu.Trigger asChild>
              <Button type="button" variant="ghost">
                <span>admin@email.com</span>
                <Icon size="sm">
                  <ChevronUpIcon style={{ marginLeft: "auto" }} />
                </Icon>
              </Button>
            </Menu.Trigger>
            <Menu.Positioner>
              <Menu.Content>
                <Menu.ItemGroup>
                  <Menu.Item value="account-settings">
                    <Icon size="sm">
                      <SettingsIcon />
                    </Icon>
                    Settings
                  </Menu.Item>
                  <Menu.Separator />
                  <Menu.Item value="sign-out">
                    <Icon size="sm">
                      <LogOutIcon />
                    </Icon>
                    Sign out
                  </Menu.Item>
                </Menu.ItemGroup>
              </Menu.Content>
            </Menu.Positioner>
          </Menu.Root>
        </Flex>
      </Flex>
      <Flex flexGrow="1" direction="column">
        <Flex padding="2" borderBottomWidth="1px">
          <ColorModeButton />
        </Flex>
        <Box maxHeight="full" overflow="auto">
          <Outlet />
        </Box>
      </Flex>
    </Flex>
  );
}
