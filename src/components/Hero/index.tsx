import { Link } from 'react-router-dom';
import { Box, Button, Container, Heading, Image, Text } from '@chakra-ui/react';

const Hero = () => {
  return (
    <Box
      backgroundColor=" #f6f6f6"
      backgroundImage='url("/images/hero.jpg")'
      backgroundSize="cover"
      backgroundPosition="50%"
    >
      <Container
        maxWidth={{
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1280px',
          '2xl': '1440px',
        }}
        p={0}
        height="calc(100vh - 5.25rem)"
        display="flex"
        flexDirection="column"
        alignItems={{ sm: 'end' }}
        justifyContent={{ sm: 'center' }}
      >
        <Box
          maxWidth="40rem"
          display="flex"
          flexDirection="column"
          gap={{ base: '2rem', sm: '10rem' }}
          padding={{ base: '1.5rem', sm: '3rem 4rem' }}
          alignItems={{ sm: 'start' }}
          backgroundColor="white"
        >
          <Box
            display="flex"
            flexDirection="column"
            gap={{ base: '1rem', sm: '1.5rem' }}
          >
            <Heading
              fontSize={{ base: '1.5rem', md: '2rem' }}
              fontWeight="normal"
            >
              Artigos de luxo para pessoas que amam design atemporal de
              qualidade.
            </Heading>
            <Text fontSize={{ md: '1.125rem' }}>
              Com a nossa nova coleção, veja mais de 400 peças exclusivas, desde
              artigos para o lar até movéis.
            </Text>
          </Box>
          <Button asChild>
            <Link to="/produtos">Ver coleção</Link>
          </Button>
        </Box>
        <Image
          src="/images/hero.jpg"
          alt=""
          aria-hidden
          flexGrow="1"
          objectFit="cover"
          display={{ sm: 'none' }}
        />
      </Container>
    </Box>
  );
};

export default Hero;
