import { Box, Container, Flex, Heading, Icon, Text } from '@chakra-ui/react';
import { CircleCheckIcon } from 'lucide-react';
import { NewsletterForm } from './newsletter-form';
import { useTranslation } from 'react-i18next';

export function Newsletter() {
  const { t } = useTranslation();

  const benefits = t('newsletter.benefits', {
    returnObjects: true,
  }) as string[];

  return (
    <Box
      backgroundImage="url('/images/newsletter.jpg')"
      backgroundSize="cover"
    >
      <Container>
        <Flex
          align={{ sm: 'center' }}
          justify={{ sm: 'center' }}
          paddingBlock="{spacing.6}"
        >
          <Flex
            as="section"
            direction="column"
            gap="{spacing.6}"
            padding={{ sm: '5rem 0' }}
          >
            <Flex
              direction="column"
              gap="{spacing.4}"
              maxWidth="35rem"
              textAlign={{ sm: 'center' }}
            >
              <Heading
                as="h4"
                color="white"
                fontSize={{ base: '2xl', xl: '2rem' }}
                fontWeight="normal"
              >
                {t('newsletter.heading')}
              </Heading>
              <Text
                color="white"
                fontSize={{ base: 'sm', xl: 'lg' }}
              >
                {t('newsletter.content')}
              </Text>
            </Flex>
            <Box
              display="flex"
              flexDirection={{ base: 'column', sm: 'row' }}
              gap="{spacing.4}"
              alignSelf={{ sm: 'center' }}
            >
              {benefits.map((benefit) => (
                <Box
                  key={benefit}
                  as="span"
                  color="white"
                  display="flex"
                  alignItems="center"
                  gap="{spacing.2}"
                >
                  <Icon size="md">
                    <CircleCheckIcon />
                  </Icon>
                  {benefit}
                </Box>
              ))}
            </Box>
            <NewsletterForm />
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
}
