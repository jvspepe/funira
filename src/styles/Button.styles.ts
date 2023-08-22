import { styled } from "styled-components";

const Button = styled.button`
  background-color: transparent;
  border: none;
  padding: 0.25rem;
  border-radius: 0.5rem;

  &:hover {
    background-color: ${({ theme }) => theme.colors.border.primary};
  }

  & svg {
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;

export default Button;
