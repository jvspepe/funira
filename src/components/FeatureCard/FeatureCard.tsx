import Feature from "../../@types/feature";
import * as Styled from "./styles";
type Props = {
  feature: Feature;
};

const FeatureCard = ({ feature }: Props) => {
  return (
    <Styled.Wrapper>
      <Styled.Icon>{feature.icon}</Styled.Icon>
      <Styled.Heading>{feature.title}</Styled.Heading>
      <Styled.Paragraph>{feature.details}</Styled.Paragraph>
    </Styled.Wrapper>
  );
};

export default FeatureCard;
