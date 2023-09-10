import { styled } from "styled-components";
import font from "../../styles/font";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  padding: 2rem 1.5rem;
  background-color: ${({ theme }) => theme.colors.background.secondary};
`;

const Heading = styled.h3`
  color: ${({ theme }) => theme.colors.text.primary};
  font-family: ${font.family.heading};
  font-size: ${font.size.xl};
  font-weight: normal;
`;

const Paragraph = styled.p`
  color: ${({ theme }) => theme.colors.text.primary};
  font-family: ${font.family.body};
`;

const Icon = styled.div`
  & svg {
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;

export { Wrapper, Heading, Paragraph, Icon };
