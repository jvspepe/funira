// oxlint-disable unicorn/no-negated-condition
import {
  Box,
  Button,
  Container,
  Drawer,
  Flex,
  Icon,
  IconButton,
  Link,
  Menu,
  Portal,
} from "@chakra-ui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getRouteApi,
  Link as RouterLink,
  useRouter,
} from "@tanstack/react-router";
import {
  HomeIcon,
  LibraryIcon,
  MenuIcon,
  ShoppingCartIcon,
  SofaIcon,
  UserCircleIcon,
  XIcon,
} from "lucide-react";

import { authClient } from "@/config/auth-client";
import { authQueryKeys, authQueryOptions } from "@/features/auth/queries";

export function Header() {
  const router = useRouter();

  const routeApi = getRouteApi("/(layout)");

  const { queryClient } = routeApi.useRouteContext();

  const { data: session } = useQuery(authQueryOptions());

  const signOutMutation = useMutation({
    mutationFn: async () => {
      await authClient.signOut();
    },
    onSuccess: async () => {
      queryClient.setQueryData(authQueryKeys.all, null);

      await queryClient.invalidateQueries({ queryKey: authQueryKeys.all });

      await router.invalidate();
    },
  });

  async function handleSignOut() {
    await signOutMutation.mutateAsync();
  }

  return (
    <Box as="header" backgroundColor="bg" position="sticky" top="0" zIndex={99}>
      <Container>
        <Flex align="center" justify="space-between" paddingY="{spacing.6}">
          <Link asChild fontSize="2xl">
            <RouterLink to="/">Funira</RouterLink>
          </Link>
          <Box
            as="ul"
            display={{ base: "none", md: "flex" }}
            gap="2rem"
            listStyleType="none"
          >
            <Box as="li">
              <Link asChild>
                <RouterLink to="/">Home</RouterLink>
              </Link>
            </Box>
            <Box as="li">
              <Menu.Root>
                <Menu.Trigger asChild>
                  <Link asChild>
                    <Button type="button" unstyled>
                      Products
                    </Button>
                  </Link>
                </Menu.Trigger>
                <Portal>
                  <Menu.Positioner>
                    <Menu.Content>
                      <Menu.Item asChild value="/">
                        <RouterLink to="/products">See all</RouterLink>
                      </Menu.Item>
                    </Menu.Content>
                  </Menu.Positioner>
                </Portal>
              </Menu.Root>
            </Box>
            <Box as="li">
              <Link asChild>
                <RouterLink to="/about">About</RouterLink>
              </Link>
            </Box>
          </Box>
          <Flex gap="4">
            <IconButton type="button" variant="ghost">
              <Icon>
                <ShoppingCartIcon />
              </Icon>
            </IconButton>
            <Menu.Root positioning={{ placement: "bottom-end" }}>
              <Menu.Trigger asChild>
                <IconButton variant="ghost">
                  <Icon>
                    <UserCircleIcon />
                  </Icon>
                </IconButton>
              </Menu.Trigger>
              <Menu.Positioner>
                <Menu.Content>
                  <Menu.ItemGroup>
                    <Menu.ItemGroupLabel>Account</Menu.ItemGroupLabel>
                    <Menu.Separator />
                    {!session ? (
                      <>
                        <Menu.Item value="sign-up" asChild>
                          <RouterLink to="/sign-up">Sign Up</RouterLink>
                        </Menu.Item>
                        <Menu.Item value="sign-in" asChild>
                          <RouterLink to="/sign-in">Sign In</RouterLink>
                        </Menu.Item>
                      </>
                    ) : (
                      <>
                        <Menu.Item value="settings">Settings</Menu.Item>
                        <Menu.Item onClick={handleSignOut} value="sign-out">
                          Sign Out
                        </Menu.Item>
                      </>
                    )}
                  </Menu.ItemGroup>
                </Menu.Content>
              </Menu.Positioner>
            </Menu.Root>
            <Drawer.Root>
              <Drawer.Backdrop />
              <Drawer.Trigger asChild>
                <IconButton
                  type="button"
                  variant="ghost"
                  display={{ base: "block", md: "none" }}
                >
                  <Icon>
                    <MenuIcon />
                  </Icon>
                </IconButton>
              </Drawer.Trigger>
              <Drawer.Positioner>
                <Drawer.Content>
                  <Drawer.Header>
                    <Drawer.Title>Navigation</Drawer.Title>
                    <Drawer.CloseTrigger asChild position="initial">
                      <IconButton variant="ghost">
                        <Icon>
                          <XIcon />
                        </Icon>
                      </IconButton>
                    </Drawer.CloseTrigger>
                  </Drawer.Header>
                  <Drawer.Body asChild>
                    <Flex align="start" direction="column">
                      <Button
                        asChild
                        variant="ghost"
                        width="full"
                        justifyContent="start"
                      >
                        <RouterLink to="/">
                          <HomeIcon />
                          Home
                        </RouterLink>
                      </Button>
                      <Button
                        asChild
                        variant="ghost"
                        width="full"
                        justifyContent="start"
                      >
                        <RouterLink to="/">
                          <SofaIcon />
                          Products
                        </RouterLink>
                      </Button>
                      <Button
                        asChild
                        variant="ghost"
                        width="full"
                        justifyContent="start"
                      >
                        <RouterLink to="/">
                          <LibraryIcon />
                          About Us
                        </RouterLink>
                      </Button>
                    </Flex>
                  </Drawer.Body>
                </Drawer.Content>
              </Drawer.Positioner>
            </Drawer.Root>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
}
