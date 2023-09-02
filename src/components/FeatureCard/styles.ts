import { styled } from "styled-components";
import font from "../../styles/font";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  padding: 2rem 1.5rem;

  background-color: ${({ theme }) => theme.colors.background.secondary};
`;

const Icon = styled.div`
  & svg {
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;

const Title = styled.h3`
  color: ${({ theme }) => theme.colors.text.primary};
  font-family: ${font.family.heading};
  font-size: ${font.size.xl};
  font-weight: normal;
`;

const Details = styled.p`
  color: ${({ theme }) => theme.colors.text.primary};
  font-family: ${font.family.body};
  font-size: ${font.size.md};
`;

export { Wrapper, Icon, Title, Details };
