import { useRef } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Container,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  IconButton,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
} from '@chakra-ui/react';
import { CircleUserRound, MenuIcon } from 'lucide-react';
import { logoutUser } from '@/lib/auth';
import useAuth from '@/contexts/auth/hooks';
import useGetCategories from '@/hooks/useGetCategories';
import ActionCart from '@/components/ActionCart';

const Header = () => {
  const buttonRef = useRef(null);
  const { currentUser } = useAuth();
  const { categories } = useGetCategories();

  const { isOpen, onClose, onOpen } = useDisclosure();

  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await logoutUser();

      navigate('/');
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return (
    <Box
      as="header"
      position="sticky"
      top="0"
      bgColor="#FAFAFA"
    >
      <Container
        maxW={{
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1280px',
          xxl: '1440px',
        }}
        p={0}
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          padding="1.5rem"
        >
          <Link
            as={RouterLink}
            to="/"
            fontSize="1.5rem"
          >
            Funira
          </Link>
          <Box
            as="ul"
            display={{ base: 'none', md: 'flex' }}
            gap="2rem"
            listStyleType="none"
          >
            <Box as="li">
              <Link
                as={RouterLink}
                to="/"
              >
                Início
              </Link>
            </Box>
            <Box as="li">
              <Menu placement="bottom">
                <MenuButton
                  as={Button}
                  variant="link"
                >
                  Produtos
                </MenuButton>
                <MenuList>
                  <MenuItem
                    as={RouterLink}
                    to="/produtos"
                  >
                    Ver todos
                  </MenuItem>
                  {categories.map((category) => (
                    <MenuItem
                      key={category.label}
                      as={RouterLink}
                      to={`produtos?tipo=${category.value}`}
                    >
                      {category.label}
                    </MenuItem>
                  ))}
                </MenuList>
              </Menu>
            </Box>
            <Box as="li">
              <Link
                as={RouterLink}
                to="/sobre"
              >
                Sobre
              </Link>
            </Box>
          </Box>
          <Box
            display="flex"
            alignItems="center"
            gap="0.5rem"
          >
            <ActionCart />
            <Menu placement="bottom-end">
              <MenuButton
                as={IconButton}
                aria-label="Menu de usuário"
                variant="ghost"
                icon={<CircleUserRound />}
              />
              <MenuList>
                {!currentUser ? (
                  <>
                    <MenuItem
                      as={RouterLink}
                      to="/conectar"
                    >
                      Conectar
                    </MenuItem>
                    <MenuItem
                      as={RouterLink}
                      to="/criar-conta"
                    >
                      Criar Conta
                    </MenuItem>
                  </>
                ) : (
                  <MenuItem onClick={handleSignOut}>Sair</MenuItem>
                )}
              </MenuList>
            </Menu>
            <IconButton
              onClick={onOpen}
              ref={buttonRef}
              type="button"
              aria-label="Abrir menu"
              variant="ghost"
              display={{ base: 'flex', md: 'none' }}
              icon={<MenuIcon />}
            />
            <Drawer
              isOpen={isOpen}
              onClose={onClose}
              finalFocusRef={buttonRef}
              placement="right"
            >
              <DrawerOverlay />
              <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader borderBottom="1px solid #EBE8F4">
                  Navegação
                </DrawerHeader>
                <DrawerBody
                  paddingInline={0}
                  paddingBlock={'1.5rem'}
                >
                  <Box
                    as="ul"
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    listStyleType="none"
                  >
                    <Box as="li">
                      <Button
                        as={RouterLink}
                        to="/"
                        variant="ghost"
                        size="lg"
                        width="full"
                      >
                        Início
                      </Button>
                    </Box>
                    <Box as="li">
                      <Accordion allowToggle>
                        <AccordionItem>
                          <AccordionButton
                            as={Button}
                            variant="ghost"
                            size="lg"
                            width="full"
                            display="flex"
                            alignItems="center"
                            gap="0.5rem"
                          >
                            Produtos
                            <AccordionIcon />
                          </AccordionButton>
                          <AccordionPanel>
                            <Box
                              as="ul"
                              display="flex"
                              flexDirection="column"
                              justifyContent="center"
                              listStyleType="none"
                            >
                              <Box as="li">
                                <Button
                                  as={RouterLink}
                                  to="/produtos"
                                  width="full"
                                >
                                  Ver todos
                                </Button>
                              </Box>
                              {categories.map((category) => (
                                <Box
                                  key={category.label}
                                  as="li"
                                >
                                  <Button
                                    as={RouterLink}
                                    to={`produtos?tipo=${category.value}`}
                                    width="full"
                                  >
                                    {category.label}
                                  </Button>
                                </Box>
                              ))}
                            </Box>
                          </AccordionPanel>
                        </AccordionItem>
                      </Accordion>
                    </Box>
                    <Box as="li">
                      <Button
                        as={RouterLink}
                        to="/sobre"
                        variant="ghost"
                        size="lg"
                        width="full"
                      >
                        Sobre
                      </Button>
                    </Box>
                  </Box>
                </DrawerBody>
                <DrawerFooter>
                  <Box
                    display="flex"
                    alignItems="center"
                    gap="1rem"
                    w={'full'}
                  >
                    <Button
                      as={RouterLink}
                      to="/conectar"
                      flexGrow={1}
                    >
                      Conectar
                    </Button>
                    <Button
                      as={RouterLink}
                      to="/criar-conta"
                      flexGrow={1}
                    >
                      Criar Conta
                    </Button>
                  </Box>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Header;
