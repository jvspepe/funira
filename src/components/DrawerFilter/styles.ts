import { styled } from "styled-components";
import font from "../../styles/font";

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.primary};
  & h3 {
    font-family: ${font.family.heading};
    font-size: ${font.size["4xl"]};
    font-weight: normal;
  }
`;

const Content = styled.div`
  display: grid;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
`;

export { Header, Content };
