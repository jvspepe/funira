import { styled } from "styled-components";

const Background = styled.div`
  background-color: ${({ theme }) => theme.colors.background.secondary};
  height: calc(100dvh - 5rem);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
`;

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.background.tertiary};
  padding: 1.5rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export { Background, Wrapper, Form };
