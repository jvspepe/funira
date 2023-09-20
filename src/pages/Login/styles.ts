import { styled } from "styled-components";
import breakpoints from "../../styles/breakpoints";

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.background.secondary};

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

export { Wrapper, Form };
