import { styled } from "styled-components";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const Checkbox = styled.input`
  appearance: none;
  width: 1rem;
  height: 1rem;
  flex-shrink: 0;
  border: 1px solid ${({ theme }) => theme.colors.border.tertiary};
  border-radius: 0.125rem;
  overflow: hidden;
  transition: border-color 300ms;

  &:checked {
    background-image: url("/icons/checkmark.svg");
    background-position: center;
    background-size: cover;
    background-color: ${({ theme }) => theme.colors.border.secondary};
    background-repeat: no-repeat;
    border-color: ${({ theme }) => theme.colors.border.secondary};
  }

  &:hover {
    border: 1px solid ${({ theme }) => theme.colors.border.secondary};
  }
`;

const Label = styled.label`
  font-family: ${({ theme }) => theme.fonts.heading};
`;

export { Wrapper, Checkbox, Label };
