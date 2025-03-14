import { Container, Heading } from '@chakra-ui/react';
import Newsletter from '@/components/Newsletter';

const About = () => {
  return (
    <div>
      <Container
        maxW={{
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1280px',
          xxl: '1440px',
        }}
        padding={0}
      >
        <Heading>
          Uma marca construída com amor pelo artesanato, qualidade e excelente
          atendimento ao cliente.
        </Heading>
      </Container>

      <Newsletter />
    </div>
  );
};

export default About;
