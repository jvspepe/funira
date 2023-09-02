import Feature from "../../@types/feature";
import * as S from "./styles";
type Props = {
  feature: Feature;
};

const FeatureCard = ({ feature }: Props) => {
  return (
    <S.Wrapper>
      <S.Icon>{feature.icon}</S.Icon>
      <S.Title>{feature.title}</S.Title>
      <S.Details>{feature.details}</S.Details>
    </S.Wrapper>
  );
};

export default FeatureCard;
