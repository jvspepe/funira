import { Link as RouterLink } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import {
  Box,
  Container,
  Heading,
  List,
  Link,
  Separator,
  Flex,
  Grid,
} from '@chakra-ui/react';
import { paths } from '@/config/paths';
import { getCategories } from '@/features/categories/services';
import { Copyright } from '@/components/section/copyright';
import { FooterForm } from './footer-form';

const productRoutes = [
  { label: 'Maior Preço', value: 'maior-preço' },
  { label: 'Menor Preço', value: 'menor-preço' },
  { label: 'Novos', value: 'novo' },
  { label: 'Mais Vendidos', value: 'mais-vendidos' },
  { label: 'Melhor Avaliados', value: 'melhor-avaliados' },
];
const companyRoutes = ['Sobre', 'Contato', 'Carreiras'];

export function Footer() {
  const categoriesQuery = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });

  return (
    <Box>
      <Container>
        <Grid
          as="footer"
          gap="{spacing.6}"
          paddingBlock="{spacing.6}"
        >
          <Flex
            direction={{ base: 'column', lg: 'row' }}
            gap="{spacing.12}"
          >
            <Flex
              wrap="wrap"
              gap="{spacing.12}"
            >
              <Flex
                direction="column"
                gap="{spacing.2}"
              >
                <Heading size="md">Categorias</Heading>
                <List.Root
                  as="ul"
                  display="flex"
                  flexDirection="column"
                  gap="{spacing.2}"
                  listStyle="none"
                  margin="0"
                >
                  {categoriesQuery.data?.map((item) => (
                    <List.Item
                      key={item.id}
                      asChild
                      fontSize="0.875rem"
                    >
                      <Link asChild>
                        <RouterLink
                          to={`${paths.user.products}?tipo=${item.value}`}
                        >
                          {item.label.pt}
                        </RouterLink>
                      </Link>
                    </List.Item>
                  ))}
                </List.Root>
              </Flex>
              <Flex
                direction="column"
                gap="{spacing.2}"
              >
                <Heading size="md">Menu</Heading>
                <List.Root
                  display="flex"
                  flexDirection="column"
                  gap="{spacing.2}"
                  listStyle="none"
                  margin="0"
                >
                  {productRoutes.map((route) => (
                    <List.Item
                      key={route.value}
                      asChild
                      fontSize="0.875rem"
                    >
                      <Link asChild>
                        <RouterLink to={`/produtos?ordem=${route.value}`}>
                          {route.label}
                        </RouterLink>
                      </Link>
                    </List.Item>
                  ))}
                </List.Root>
              </Flex>
              <Flex
                direction="column"
                gap="{spacing.2}"
              >
                <Heading size="md">Nossa Empresa</Heading>
                <List.Root
                  display="flex"
                  flexDirection="column"
                  gap="{spacing.2}"
                  listStyle="none"
                  margin="0"
                >
                  {companyRoutes.map((route) => (
                    <List.Item
                      key={route}
                      asChild
                      fontSize="0.875rem"
                    >
                      <Link asChild>
                        <RouterLink to="/">{route}</RouterLink>
                      </Link>
                    </List.Item>
                  ))}
                </List.Root>
              </Flex>
            </Flex>
            <FooterForm />
          </Flex>
          <Separator />
          <Copyright />
        </Grid>
      </Container>
    </Box>
  );
}
