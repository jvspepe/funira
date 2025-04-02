import { Link } from 'react-router';
import {
  Accordion,
  Box,
  Button,
  CloseButton,
  Drawer,
  IconButton,
  Portal,
  Separator,
} from '@chakra-ui/react';
import { MenuIcon } from 'lucide-react';
import { TCategory } from '@/@types/categories';

type Props = {
  categories: TCategory[];
};

const MobileDrawer = ({ categories }: Props) => {
  return (
    <Drawer.Root>
      <Drawer.Trigger asChild>
        <IconButton
          type="button"
          aria-label="Abrir menu"
          variant="ghost"
          display={{ base: 'flex', md: 'none' }}
        >
          <MenuIcon />
        </IconButton>
      </Drawer.Trigger>
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content>
            <Drawer.CloseTrigger asChild>
              <CloseButton />
            </Drawer.CloseTrigger>
            <Drawer.Header>
              <Drawer.Title>Navegação</Drawer.Title>
            </Drawer.Header>
            <Drawer.Body paddingInline={0}>
              <Box
                as="ul"
                display="flex"
                flexDirection="column"
                justifyContent="center"
                listStyleType="none"
              >
                <Box as="li">
                  <Button
                    asChild
                    variant="ghost"
                    size="lg"
                    width="full"
                  >
                    <Link to="/">Início</Link>
                  </Button>
                </Box>
                <Separator />
                <Box as="li">
                  <Accordion.Root collapsible>
                    <Accordion.Item value="products">
                      <Accordion.ItemTrigger asChild>
                        <Button
                          type="button"
                          variant="ghost"
                        >
                          Produtos
                        </Button>
                        {/* <Accordion.ItemIndicator /> */}
                      </Accordion.ItemTrigger>
                      <Accordion.ItemContent as="ul">
                        <Accordion.ItemBody
                          as="li"
                          width="full"
                          padding="0"
                        >
                          <Button
                            asChild
                            variant="ghost"
                            width="full"
                          >
                            <Link to="/produtos">Ver todos</Link>
                          </Button>
                        </Accordion.ItemBody>
                        {categories.map((category) => (
                          <Accordion.ItemBody
                            key={category.uid}
                            as="li"
                            width="full"
                            padding="0"
                          >
                            <Button
                              asChild
                              variant="ghost"
                              width="full"
                            >
                              <Link to={`produtos?tipo=${category.value}`}>
                                {category.label}
                              </Link>
                            </Button>
                          </Accordion.ItemBody>
                        ))}
                      </Accordion.ItemContent>
                    </Accordion.Item>
                  </Accordion.Root>
                </Box>
                <Box as="li">
                  <Button
                    asChild
                    variant="ghost"
                    size="lg"
                    width="full"
                  >
                    <Link to="/sobre">Sobre</Link>
                  </Button>
                </Box>
              </Box>
            </Drawer.Body>
            <Drawer.Footer>
              <Button
                asChild
                flexGrow={1}
              >
                <Link to="/conectar">Conectar</Link>
              </Button>
              <Button
                asChild
                flexGrow={1}
              >
                <Link to="/criar-conta">Criar Conta</Link>
              </Button>
            </Drawer.Footer>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );
};

export default MobileDrawer;
