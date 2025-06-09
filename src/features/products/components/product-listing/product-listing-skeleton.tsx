import { NumberStepper } from '@/components/ui/number-stepper';
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Icon,
  Separator,
  Skeleton,
  Text,
} from '@chakra-ui/react';
import { ShoppingCartIcon } from 'lucide-react';

export function ProductListingSkeleton() {
  return (
    <Box backgroundColor="bg.muted">
      <Container
        display="grid"
        gridTemplateColumns={{ lg: 'repeat(2, 1fr)' }}
        gap={{ lg: '{spacing.6}' }}
        paddingBlock={{ lg: '{spacing.12}' }}
        paddingInline={{ base: '0' }}
        minHeight="calc(100dvh - {sizes.22})"
      >
        <Skeleton />
        <Flex
          direction="column"
          gap="{spacing.6}"
          padding={{
            base: '{spacing.6}',
            sm: '{spacing.6} 0',
            md: '{spacing.10}',
          }}
          borderRadius="{radii.l2}"
          backgroundColor="bg.panel"
        >
          <Flex
            direction="column"
            gap="{spacing.4}"
          >
            <Skeleton>
              <Heading
                as="h1"
                size={{ base: '2xl', xl: '4xl' }}
                fontWeight="normal"
              >
                Name
              </Heading>
            </Skeleton>
            <Skeleton width="fit-content">
              <Text
                as="span"
                textStyle="xl"
                color="fg.muted"
              >
                Price
              </Text>
            </Skeleton>
          </Flex>
          <Flex
            direction="column"
            gap="{spacing.4}"
          >
            <Skeleton width="fit">
              <Heading
                as="h2"
                size="md"
                fontWeight="normal"
              >
                Description
              </Heading>
            </Skeleton>
            <Skeleton>
              <Text
                textStyle={{ base: 'sm', md: 'md' }}
                color="fg.muted"
              >
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Explicabo facere harum ad reprehenderit culpa mollitia
                temporibus ex facilis autem, voluptates qui labore totam eveniet
                voluptatibus corrupti saepe eos veritatis assumenda doloribus
                ipsam. Eaque numquam quam aliquid est, odit commodi dolore
                labore pariatur sunt officia saepe similique excepturi a
                consequuntur sit.
              </Text>
            </Skeleton>
          </Flex>
          <Flex
            direction="column"
            grow={{ lg: '1' }}
            gap="{spacing.4}"
          >
            <Skeleton width="fit">
              <Heading
                as="h3"
                size="md"
                fontWeight="normal"
              >
                Dimesions
              </Heading>
            </Skeleton>
            <Flex
              justify="space-between"
              gap="1rem"
              color="fg.muted"
            >
              <Skeleton>
                <Flex
                  direction="column"
                  gap="{spacing.4}"
                  textAlign="start"
                >
                  <Heading
                    size={{ base: 'sm', md: 'md' }}
                    fontWeight="normal"
                  >
                    Height
                  </Heading>
                  <Text textStyle={{ base: 'xs', md: 'sm' }}>10cm</Text>
                </Flex>
              </Skeleton>
              <Separator
                orientation="vertical"
                borderColor="#DCDCDC"
              />
              <Skeleton>
                <Flex
                  direction="column"
                  gap="{spacing.4}"
                  textAlign="center"
                >
                  <Heading
                    size={{ base: 'sm', md: 'md' }}
                    fontWeight="normal"
                  >
                    Width
                  </Heading>
                  <Text textStyle={{ base: 'xs', md: 'sm' }}>10cm</Text>
                </Flex>
              </Skeleton>
              <Separator
                orientation="vertical"
                borderColor="#DCDCDC"
              />
              <Skeleton>
                <Box
                  display="flex"
                  flexDirection="column"
                  gap="{spacing.4}"
                  textAlign="end"
                >
                  <Heading
                    size={{ base: 'sm', md: 'md' }}
                    fontWeight="normal"
                  >
                    Depth
                  </Heading>
                  <Text textStyle={{ base: 'xs', md: 'sm' }}>10cm</Text>
                </Box>
              </Skeleton>
            </Flex>
          </Flex>
          <Flex
            direction={{ base: 'column', lg: 'row' }}
            align={{ lg: 'end' }}
            justify={{ lg: 'space-between' }}
            gap="1rem"
          >
            <Skeleton>
              <Button
                type="button"
                size="lg"
              >
                <Icon size="sm">
                  <ShoppingCartIcon />
                </Icon>
                <Box as="span">Confirm</Box>
              </Button>
            </Skeleton>
            <Skeleton>
              <Button
                type="button"
                size="lg"
              >
                <Icon size="sm">
                  <ShoppingCartIcon />
                </Icon>
                <Box as="span">Confirm</Box>
              </Button>
            </Skeleton>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
}
