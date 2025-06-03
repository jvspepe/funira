import { Box, Container, Heading } from '@chakra-ui/react';
import { Newsletter } from '@/components/section/newsletter';

export function About() {
  return (
    <Box>
      <Container minHeight="calc(100dvh - {sizes.22})">
        <Heading>Página ainda está sendo construída</Heading>
      </Container>
      <Newsletter />
    </Box>
  );
}
