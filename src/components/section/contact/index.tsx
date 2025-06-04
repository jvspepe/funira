import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Button, Flex, Grid, Heading, Image, Text } from '@chakra-ui/react';

export function Contact() {
  const { t } = useTranslation();

  return (
    <Grid
      as="section"
      templateColumns={{ base: 'none', sm: 'repeat(2, 1fr)' }}
      templateRows={{ base: 'repeat(2, 1fr)', sm: 'none' }}
      gap="{spacing.6}"
    >
      <Flex
        direction="column"
        align={{ md: 'start' }}
        gap="{spacing.4}"
        padding={{ base: '{spacing.8}', md: '{spacing.16}' }}
        backgroundColor="bg.muted"
        borderRadius="{radii.l2}"
      >
        <Heading
          fontSize={{ base: '{fontSizes.xl}', xl: '2rem' }}
          fontWeight="normal"
        >
          {t('contact.title')}
        </Heading>
        <Text
          textStyle={{ base: 'sm', xl: 'lg' }}
          flexGrow="1"
        >
          {t('contact.content')}
        </Text>
        <Button
          asChild
          size="lg"
        >
          <Link to="/">{t('home.hero.button')}</Link>
        </Button>
      </Flex>
      <Image
        src="/images/cta.jpg"
        objectFit="cover"
        borderRadius="{radii.l2}"
        boxShadow="0 1px 2px 0 rgb(0 0 0 / 0.05)"
      />
    </Grid>
  );
}
