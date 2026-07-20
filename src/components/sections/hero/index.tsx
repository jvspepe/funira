import { Button, Card, Flex, Image } from "@chakra-ui/react";
import { Link } from "@tanstack/react-router";

export function Hero() {
  return (
    <Flex direction="column">
      <Card.Root variant="subtle">
        <Card.Header>
          Artigos de luxo para pessoas que amam design atemporal de qualidade
        </Card.Header>
        <Card.Body>
          Com a nossa nova coleção, veja mais de 400 peças exclusivas, desde
          artigos para o lar até móveis
        </Card.Body>
        <Card.Footer>
          <Button asChild>
            <Link to="/">Ver coleção</Link>
          </Button>
        </Card.Footer>
      </Card.Root>
      <Image src="/images/hero.jpg" alt="Hero" />
    </Flex>
  );
}
