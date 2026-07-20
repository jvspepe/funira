import {
  Button,
  Card,
  Container,
  Flex,
  Group,
  Heading,
  Icon,
  Input,
  Text,
} from "@chakra-ui/react";
import { createFileRoute } from "@tanstack/react-router";
import { CheckCircleIcon } from "lucide-react";

import { FeatureDisplay } from "@/components/sections/features/feature-display";
import { Footer } from "@/components/sections/footer";
import { Hero } from "@/components/sections/hero";

export const Route = createFileRoute("/(layout)/")({ component: Home });

function Home() {
  return (
    <Container display="flex" flexDirection="column" gap="8" paddingY="4">
      <Hero />
      <FeatureDisplay />
      <Flex direction="column" gap="4">
        <Heading>Produtos mais recentes</Heading>
        <Button width="min-content">Ver mais</Button>
      </Flex>
      <Flex direction="column" gap="4">
        <Heading>Produtos mais vendidos</Heading>
        <Button width="min-content">Ver mais</Button>
      </Flex>
      <Flex flexDirection={{ base: "column", md: "row" }} gap="4">
        <Card.Root variant="subtle">
          <Card.Header>Começou com uma pequena ideia</Card.Header>
          <Card.Body>
            Uma marca global com origens locais, nossa história começou em um
            pequeno estúdio no sul de Londres no início de 2014
          </Card.Body>
          <Card.Footer>
            <Button>Sobre Nós</Button>
          </Card.Footer>
        </Card.Root>
        <Card.Root variant="subtle">
          <Card.Header>Começou com uma pequena ideia</Card.Header>
          <Card.Body>
            Uma marca global com origens locais, nossa história começou em um
            pequeno estúdio no sul de Londres no início de 2014
          </Card.Body>
          <Card.Footer>
            <Button>Ver coleção</Button>
          </Card.Footer>
        </Card.Root>
      </Flex>
      <Flex
        alignItems="center"
        justifyContent="center"
        direction="column"
        gap="4"
      >
        <Heading>Junte-se ao clube e aproveite os benefícios</Heading>
        <Text>
          Cadastre-se para receber nossa newsletter e receba ofertas exclusivas
          em novas coleções, liquidações, lojas pop-up e muito mais
        </Text>
        <Flex
          direction={{ base: "column", md: "row" }}
          gap="2"
          width="full"
          justifyContent="center"
        >
          <Flex gap="2">
            <Icon>
              <CheckCircleIcon />
            </Icon>
            <Text>Ofertas Exclusivas</Text>
          </Flex>
          <Flex gap="2">
            <Icon>
              <CheckCircleIcon />
            </Icon>
            <Text>Ofertas Exclusivas</Text>
          </Flex>
          <Flex gap="2">
            <Icon>
              <CheckCircleIcon />
            </Icon>
            <Text>Ofertas Exclusivas</Text>
          </Flex>
        </Flex>
        <Group attached>
          <Input placeholder="Cadastre seu e-mail" width="min-content" />
          <Button>Cadastrar</Button>
        </Group>
      </Flex>
      <Footer />
    </Container>
  );
}
