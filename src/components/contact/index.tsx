import { Link } from 'react-router';
import { Box, Button, Heading, Image, Text } from '@chakra-ui/react';

const Contact = () => {
  return (
    <Box
      as="section"
      display="grid"
      gridTemplateColumns={{ base: 'none', sm: 'repeat(2, 1fr)' }}
      gridTemplateRows={{ base: 'repeat(2, 1fr)', sm: 'none' }}
      gap="{spacing.6}"
      paddingBlock="{spacing.8}"
    >
      <Box
        backgroundColor="purple.900"
        display="flex"
        flexDirection="column"
        gap="{spacing.4}"
        padding="{spacing.8} {spacing.6}"
        alignItems={{ md: 'start' }}
        color="white"
      >
        <Heading
          fontSize={{ base: '1.25rem', xl: '{spacing.8}' }}
          fontWeight="normal"
        >
          Começou com uma ideia
        </Heading>
        <Text
          fontSize={{ base: '0.875rem', xl: '1.125rem' }}
          flexGrow="1"
        >
          A Avion foi criada com a ideia de tornar móveis artesanais de alta
          qualidade acessíveis ao mercado em geral, refletindo nossa paixão pela
          criação e design de peças para o lar meticulosamente elaboradas.
        </Text>
        <Button
          asChild
          variant="subtle"
        >
          <Link to="/">Entrar em contato</Link>
        </Button>
      </Box>
      <Image
        src="/images/cta.jpg"
        alt=""
        objectFit="cover"
      />
    </Box>
  );
};

export default Contact;
