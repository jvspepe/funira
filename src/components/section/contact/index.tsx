import { Link } from 'react-router';
import { Button, Flex, Grid, Heading, Image, Text } from '@chakra-ui/react';

export function Contact() {
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
          Começou com uma pequena ideia
        </Heading>
        <Text
          textStyle={{ base: 'sm', xl: 'lg' }}
          flexGrow="1"
        >
          Uma marca global com origens locais, nossa história começou em um
          pequeno estúdio no sul de Londres no início de 2014
        </Text>
        <Button
          asChild
          size="lg"
        >
          <Link to="/">Entrar em contato</Link>
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
