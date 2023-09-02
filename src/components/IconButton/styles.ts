import { styled } from "styled-components";
import { Props } from ".";

const StyledIconButton = styled.button<Pick<Props, "$variant">>`
  border: none;
  padding: 0.25rem;
  border-radius: 0.5rem;

  background-color: transparent;
  &:hover,
  &:focus {
    background-color: ${({ theme }) => theme.colors.background.secondary};
  }
`;

export default StyledIconButton;
