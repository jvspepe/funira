import { Link } from 'react-router';
import {
  Box,
  Button,
  Collapsible,
  Heading,
  Icon,
  useCollapsible,
} from '@chakra-ui/react';
import { ChevronDown, ChevronUp, PackageIcon, UserIcon } from 'lucide-react';
import { paths } from '@/config/paths';

export function AdminSidebar() {
  const collapsible = useCollapsible();

  return (
    <Box
      display="flex"
      flexDirection="column"
      gap="{spacing.6}"
      borderRight="xs"
      borderRightColor="border"
      padding="{spacing.6}"
      minWidth="15rem"
    >
      <Heading>Funira Admin</Heading>
      <Box
        display="flex"
        flexDirection="column"
        gap="{spacing.1}"
      >
        <Button
          variant="subtle"
          width="full"
          display="flex"
          alignItems="center"
          justifyContent="start"
          gap="{spacing.2}"
          asChild
        >
          <Link to={paths.admin.users}>
            <Icon
              size="sm"
              color="gray.500"
            >
              <UserIcon />
            </Icon>
            Usuários
          </Link>
        </Button>

        <Collapsible.Root
          open={collapsible.open}
          onOpenChange={(event) => collapsible.setOpen(event.open)}
        >
          <Collapsible.Trigger asChild>
            <Button
              variant="subtle"
              width="full"
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Box
                as="span"
                display="flex"
                alignItems="center"
                gap="{spacing.2}"
              >
                <Icon
                  size="sm"
                  color="gray.500"
                >
                  <PackageIcon />
                </Icon>
                Produtos
              </Box>
              <Icon
                size="sm"
                color="gray.500"
              >
                {collapsible.open ? <ChevronUp /> : <ChevronDown />}
              </Icon>
            </Button>
          </Collapsible.Trigger>
          <Collapsible.Content>
            <Box
              paddingInlineStart="{spacing.2}"
              paddingBlock="{spacing.1}"
              display="flex"
              flexDirection="column"
            >
              <Button
                asChild
                variant="ghost"
                width="full"
                justifyContent="start"
              >
                <Link to={paths.admin.products}>Ver todos</Link>
              </Button>
              <Button
                asChild
                variant="ghost"
                width="full"
                justifyContent="start"
              >
                <Link to={paths.admin.createProduct}>Novo produto</Link>
              </Button>
              <Button
                asChild
                variant="ghost"
                width="full"
                justifyContent="start"
              >
                <Link to={paths.admin.categories}>Categorias</Link>
              </Button>
            </Box>
          </Collapsible.Content>
        </Collapsible.Root>
      </Box>
    </Box>
  );
}
