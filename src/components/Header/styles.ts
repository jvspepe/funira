import { Link } from "react-router-dom";
import { styled } from "styled-components";
import font from "../../styles/font";

const Wrapper = styled.header`
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  padding-inline: 1.5rem;
`;

const Brand = styled(Link)`
  color: ${({ theme }) => theme.colors.text.primary};
  font-family: ${font.family.heading};
  font-size: ${font.size["2xl"]};
  text-decoration: none;
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export { Wrapper, Brand, Controls };
