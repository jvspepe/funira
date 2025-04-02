import { Box, Heading, Icon, Text } from '@chakra-ui/react';
import Feature from '@/@types/feature';

type Props = {
  feature: Feature;
};

const FeatureCard = ({ feature }: Props) => {
  return (
    <Box
      height="100%"
      display="flex"
      flexDirection="column"
      gap="1.25rem"
      padding="2rem 1.5rem"
      bgColor="#F5F5F5"
      boxShadow="0 1px 2px 0 rgb(0 0 0 / 0.05)"
    >
      <Icon
        as={feature.icon}
        height="1.5rem"
        width="1.5rem"
      />
      <Heading
        as="h3"
        fontSize="1.25rem"
        fontWeight="normal"
      >
        {feature.title}
      </Heading>
      <Text>{feature.details}</Text>
    </Box>
  );
};

export default FeatureCard;
