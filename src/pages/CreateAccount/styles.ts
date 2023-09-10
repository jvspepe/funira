import { styled } from "styled-components";
import breakpoints from "../../styles/breakpoints";
import spin from "../../styles/animations/spin";

const Background = styled.div`
  background-color: ${({ theme }) => theme.colors.background.secondary};

  /* background-image: url("/images/bg-1.jpg"); */
  background-position: center;
  background-size: cover;
  height: calc(100dvh - 5rem);
  display: flex;
  align-items: center;
  padding: 1.5rem;
`;

const Form = styled.form`
  width: 20rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-inline: auto;
  background-color: ${({ theme }) => theme.colors.background.primary};

  @media (min-width: ${breakpoints.sm}) {
    width: 30rem;
  }
`;

const Spinner = styled.span`
  width: 1.5rem;
  height: 1.5rem;
  border: 1px solid ${({ theme }) => theme.colors.border.primary};
  border-right-color: transparent;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

export { Background, Form, Spinner };
