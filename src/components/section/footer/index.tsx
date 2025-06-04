import { Link as RouterLink } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
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

export function Footer() {
  const { t, i18n } = useTranslation();

  const productRoutes = t('footer.menu.items', {
    returnObjects: true,
  }) as Record<string, string>[];

  const companyRoutes = t('footer.company.items', {
    returnObjects: true,
  }) as string[];

  const currentLang = i18n.language as 'pt' | 'en';

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
                <Heading size="md">{t('footer.categories.title')}</Heading>
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
                          {item.label[currentLang] || item.label.en}
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
                <Heading size="md">{t('footer.menu.title')}</Heading>
                <List.Root
                  display="flex"
                  flexDirection="column"
                  gap="{spacing.2}"
                  listStyle="none"
                  margin="0"
                >
                  {Object.keys(productRoutes).map((key) => (
                    <List.Item
                      key={key}
                      asChild
                      fontSize="0.875rem"
                    >
                      <Link asChild>
                        <RouterLink to={`${paths.user.products}?sort=${key}`}>
                          {t(`footer.menu.items.${key}`)}
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
                <Heading size="md">{t('footer.company.title')}</Heading>
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
