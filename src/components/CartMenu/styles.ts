import styled from "styled-components";
import font from "../../styles/font";

const Wrapper = styled.div`
  display: grid;
  grid-auto-rows: 1fr;
  max-height: 22rem;
  overflow-y: auto;
  & > *:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.colors.border.primary};
  }
`;

const Text = styled.p`
  color: ${({ theme }) => theme.colors.text.primary};
  font-family: ${font.family.heading};
  font-size: ${font.size.lg};
  padding: 0.5rem;
  text-align: center;
`;

export { Wrapper, Text };
