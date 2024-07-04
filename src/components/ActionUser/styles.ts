import { styled } from "styled-components";
import Typography from "../Typography";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.25rem;

  & > *:not(:first-child) {
    border-top: 1px solid ${({ theme }) => theme.colors.border.primary};
  }
`;

const Button = styled(Typography)`
  padding: 0.5rem;
  width: 100%;

  transition: background-color 300ms;

  &:hover {
    background-color: ${({ theme }) => theme.colors.border.primary};
  }
`;

export { Wrapper, Button };
