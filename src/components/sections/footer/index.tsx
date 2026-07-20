import { Heading, Flex, Text, Icon } from "@chakra-ui/react";
import { SquareIcon } from "lucide-react";

export function Footer() {
  return (
    <Flex flexDirection="column" paddingY="8">
      <Heading size="6xl">Funira</Heading>
      <Flex
        flexDirection={{ md: "row", sm: "column" }}
        gap="4"
        justifyContent={{ md: "space-between" }}
      >
        <Flex
          as="ul"
          flexDirection={{ md: "row", sm: "column" }}
          alignItems={{ md: "center" }}
          gap="4"
        >
          <Text as="li" color="fg.muted">
            About Us
          </Text>
          <Text as="li" color="fg.muted">
            Contact
          </Text>
          <Text as="li" color="fg.muted">
            Careers
          </Text>
          <Text as="li" color="fg.muted">
            Terms of Service
          </Text>
          <Text as="li" color="fg.muted">
            Privacy Policy
          </Text>
        </Flex>
        <Flex gap="4" alignItems="center" justifyContent="space-between">
          <Text>Copyright 2025, Funira LTDA</Text>
          <Flex gap="2">
            <Icon>
              <SquareIcon />
            </Icon>
            <Icon>
              <SquareIcon />
            </Icon>
            <Icon>
              <SquareIcon />
            </Icon>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
