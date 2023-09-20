import Feature from "../../@types/feature";
import Typography from "../Typography";
import * as Styled from "./styles";

type Props = {
  feature: Feature;
};

const FeatureCard = ({ feature }: Props) => {
  return (
    <Styled.Wrapper>
      <Styled.Icon>{feature.icon}</Styled.Icon>
      <Typography
        component="h3"
        fontFamily="heading"
        fontSize="xl"
        fontWeight="normal"
      >
        {feature.title}
      </Typography>
      <Typography>{feature.details}</Typography>
    </Styled.Wrapper>
  );
};

export default FeatureCard;
