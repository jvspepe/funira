import { useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  IconButton,
  useDisclosure,
} from '@chakra-ui/react';
import { MenuIcon } from 'lucide-react';
import { TCategory } from '@/@types/categories';

type Props = {
  categories: TCategory[];
};

const MobileDrawer = ({ categories }: Props) => {
  const buttonRef = useRef(null);

  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <>
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
          <DrawerBody paddingInline={0}>
            <Box
              as="ul"
              display="flex"
              flexDirection="column"
              justifyContent="center"
              listStyleType="none"
            >
              <Box as="li">
                <Button
                  as={Link}
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
                            as={Link}
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
                              as={Link}
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
                  as={Link}
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
                as={Link}
                to="/conectar"
                flexGrow={1}
              >
                Conectar
              </Button>
              <Button
                as={Link}
                to="/criar-conta"
                flexGrow={1}
              >
                Criar Conta
              </Button>
            </Box>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default MobileDrawer;
