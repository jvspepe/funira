import { Container, Heading } from '@chakra-ui/react';
import Newsletter from '@/components/newsletter';

const About = () => {
  return (
    <div>
      <Container>
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
