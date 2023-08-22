import { Link as RouterLink } from "react-router-dom";
import { styled } from "styled-components";

const Root = styled.div`
  height: calc(100vh - 5rem);
  background-color: #f6f6f6;
  background-image: url("/images/hero-image.png");
  background-repeat: no-repeat;
  background-position: bottom;
  @media (min-width: 420px) {
    background-image: url("/images/hero-image-2.png");
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: end;
    padding-inline-end: 5rem;
  }
`;

const Section = styled.section`
  max-width: 640px;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2.5rem 1.5rem 0.5rem 1.5rem;

  background-color: ${({ theme }) => theme.colors.background.primary};

  @media (min-width: 420px) {
    padding: 3rem 4rem;
    gap: 10rem;
  }
`;

const SectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  @media (min-width: 768px) {
    gap: 1.5rem;
  }
`;

const Heading = styled.h2`
  font-family: ${({ theme }) => theme.typography.font.heading};
  font-size: ${({ theme }) => theme.typography.heading.lg};
  font-weight: normal;
`;

const Text = styled.p`
  font-family: ${({ theme }) => theme.typography.font.body};
  font-size: ${({ theme }) => theme.typography.body.md};
`;

const Link = styled(RouterLink)`
  font-family: ${({ theme }) => theme.typography.font.body};
  text-decoration: none;
  text-align: center;

  padding: 1rem 2rem;

  color: inherit;
  background-color: ${({ theme }) => theme.colors.background.secondary};
  @media (min-width: 768px) {
    align-self: start;
  }
`;

const Hero = () => {
  return (
    <Root>
      <Section>
        <SectionContainer>
          <Heading>
            Artigos de luxo para pessoas que amam design atemporal de qualidade.
          </Heading>
          <Text>
            Com a nossa nova coleção, veja mais de 400 peças exclusivas, desde
            artigos para o lar até móveis.
          </Text>
        </SectionContainer>
        <Link to="/">Ver coleção</Link>
      </Section>
    </Root>
  );
};

export default Hero;
