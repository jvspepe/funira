import { Flex, Grid, Heading } from '@chakra-ui/react';
import { CircleCheck, CreditCard, Leaf, Truck } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Feature from '@/@types/feature';
import { FeatureCard } from '@/components/section/features/feature-card';

const featureIcons = [Truck, CircleCheck, CreditCard, Leaf];

export function Features() {
  const { t } = useTranslation();

  // Create our feature list from translations and icons
  const translatedFeatures = t('features.items', {
    returnObjects: true,
  }) as Omit<Feature, 'icon'>[];

  const featureList: Feature[] = translatedFeatures.map((feature, index) => ({
    icon: featureIcons[index],
    ...feature,
  }));

  return (
    <Flex
      direction="column"
      gap="{spacing.8}"
    >
      <Heading
        size="xl"
        fontWeight="normal"
      >
        {t('features.heading')}
      </Heading>
      <Grid
        gap="{spacing.6}"
        templateColumns={{ sm: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }}
      >
        {featureList.map((feature) => (
          <FeatureCard
            key={feature.title}
            feature={feature}
          />
        ))}
      </Grid>
    </Flex>
  );
}
