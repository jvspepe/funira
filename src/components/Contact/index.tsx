import { Link } from 'react-router-dom';
import { Box, Button, Container, Heading, Image, Text } from '@chakra-ui/react';
import { useTheme } from 'styled-components';

const Contact = () => {
  const { colors } = useTheme();
  return (
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
        as="section"
        display="grid"
        gridTemplateColumns={{ base: 'none', sm: 'repeat(2, 1fr)' }}
        gridTemplateRows={{ base: 'repeat(2, 1fr)', sm: 'none' }}
        gap="1.5rem"
        padding={{ base: '2rem 1.5rem', sm: '2rem 0' }}
      >
        <Box
          backgroundColor={colors.background.tertiary}
          display="flex"
          flexDirection="column"
          gap="1.25rem"
          padding="2rem 1.5rem"
          alignItems={{ md: 'start' }}
          color="white"
        >
          <Heading
            fontSize={{ base: '1.25rem', xl: '2rem' }}
            fontWeight="normal"
          >
            Começou com uma ideia
          </Heading>
          <Text
            fontSize={{ base: '0.875rem', xl: '1.125rem' }}
            flexGrow="1"
          >
            A Avion foi criada com a ideia de tornar móveis artesanais de alta
            qualidade acessíveis ao mercado em geral, refletindo nossa paixão
            pela criação e design de peças para o lar meticulosamente
            elaboradas.
          </Text>
          <Button
            as={Link}
            to="/"
          >
            Entrar em contato
          </Button>
        </Box>
        <Image
          src="/images/cta.jpg"
          alt=""
          objectFit="cover"
        />
      </Box>
    </Container>
  );
};

export default Contact;
