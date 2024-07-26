import Feature from "@/@types/feature";
import * as S from "./styles";

type Props = {
  feature: Feature;
};

const FeatureCard = ({ feature }: Props) => {
  return (
    <S.Wrapper>
      <S.Icon>{feature.icon}</S.Icon>
      <S.Title>{feature.title}</S.Title>
      <p>{feature.details}</p>
    </S.Wrapper>
  );
};

export default FeatureCard;
