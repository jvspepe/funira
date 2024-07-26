import { styled } from "styled-components";
import BaseContainer from "@/components/ui/Container";
import breakpoints from "@/styles/breakpoints";

const Wrapper = styled.div`
  background-image: url("/images/newsletter.jpg");
  background-size: cover;
`;

const Container = styled(BaseContainer)`
  display: flex;
  padding: 1.5rem;

  @media (min-width: ${breakpoints.sm}) {
    align-items: center;
    justify-content: center;
  }
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;

  @media (min-width: ${breakpoints.sm}) {
    padding: 5rem 0;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  max-width: 35rem;

  @media (min-width: ${breakpoints.sm}) {
    text-align: center;
  }
`;

const Heading = styled.h6`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: ${({ theme }) => theme.fontSizes["2xl"]};
  font-weight: normal;
  color: ${({ theme }) => theme.colors.text.secondary};

  @media (min-width: ${breakpoints.xl}) {
    font-size: ${({ theme }) => theme.fontSizes["3xl"]};
  }
`;

const Content = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.secondary};

  @media (min-width: ${breakpoints.xl}) {
    font-size: ${({ theme }) => theme.fontSizes.lg};
  }
`;

const BenefitList = styled.div`
  color: ${({ theme }) => theme.colors.text.secondary};
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  @media (min-width: ${breakpoints.sm}) {
    align-self: center;
    flex-direction: row;
  }
`;

const BenefitItem = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export {
  Wrapper,
  Container,
  Section,
  ContentWrapper,
  Heading,
  Content,
  BenefitList,
  BenefitItem,
};
