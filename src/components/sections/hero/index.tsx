import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Image,
  Text,
} from '@chakra-ui/react';
import { paths } from '@/config/paths';

export function Hero() {
  const { t } = useTranslation();

  return (
    <Box
      backgroundColor="bg.panel"
      backgroundImage='url("/images/hero.jpg")'
      backgroundSize="cover"
      backgroundPosition="50%"
    >
      <Container
        padding="0"
        height="calc(100vh - {sizes.22})"
        display="flex"
        flexDirection="column"
        alignItems={{ sm: 'end' }}
        justifyContent={{ sm: 'center' }}
      >
        <Flex
          maxWidth="40rem"
          align={{ sm: 'start' }}
          direction="column"
          gap={{ base: '2rem', sm: '10rem' }}
          padding={{ base: '1.5rem', sm: '3rem 4rem' }}
          borderRadius={{ md: '{radii.l2}' }}
          backgroundColor="bg.panel"
        >
          <Flex
            direction="column"
            gap={{ base: '1rem', sm: '1.5rem' }}
          >
            <Heading
              fontSize={{ base: '1.5rem', md: '2rem' }}
              fontWeight="normal"
            >
              {t('home.hero.title')}
            </Heading>
            <Text textStyle={{ md: 'lg' }}>{t('home.hero.content')}</Text>
          </Flex>
          <Button
            asChild
            variant="subtle"
            size="lg"
          >
            <Link to={paths.user.products}>{t('home.hero.button')}</Link>
          </Button>
        </Flex>
        <Image
          src="/images/hero.jpg"
          aria-hidden
          flexGrow="1"
          objectFit="cover"
          display={{ sm: 'none' }}
        />
      </Container>
    </Box>
  );
}
