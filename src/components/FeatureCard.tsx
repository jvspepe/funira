import { styled } from "styled-components";
import Feature from "../@types/feature";

type Props = {
  feature: Feature;
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  padding: 2rem 1.5rem;

  background-color: ${({ theme }) => theme.colors.background.secondary};
`;

const Icon = styled.div`
  & svg {
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;

const Title = styled.h3`
  color: ${({ theme }) => theme.colors.text.primary};
  font-family: ${({ theme }) => theme.typography.font.heading};
  font-size: ${({ theme }) => theme.typography.heading.md};
  font-weight: normal;
`;

const Details = styled.p`
  color: ${({ theme }) => theme.colors.text.primary};
  font-family: ${({ theme }) => theme.typography.font.body};
  font-size: ${({ theme }) => theme.typography.body.md};
`;

const FeatureCard = ({ feature }: Props) => {
  return (
    <Wrapper>
      <Icon>{feature.icon}</Icon>
      <Title>{feature.title}</Title>
      <Details>{feature.details}</Details>
    </Wrapper>
  );
};

export default FeatureCard;
