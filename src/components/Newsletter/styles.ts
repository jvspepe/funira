import { styled } from "styled-components";
import BaseContainer from "../ui/Container";
import breakpoints from "../../styles/breakpoints";

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

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  max-width: 35rem;

  @media (min-width: ${breakpoints.sm}) {
    text-align: center;
  }
`;

const Benefits = styled.div`
  color: ${({ theme }) => theme.colors.text.secondary};
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  @media (min-width: ${breakpoints.sm}) {
    align-self: center;
    flex-direction: row;
  }
`;

export { Wrapper, Container, Section, Content, Benefits };
