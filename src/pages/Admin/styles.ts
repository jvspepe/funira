import { styled } from "styled-components";
import font from "../../styles/font";

const Form = styled.form`
  display: grid;
  gap: 1rem;
  padding: 1.5rem;
`;

const Heading = styled.h2`
  color: ${({ theme }) => theme.colors.text.primary};
  font-family: ${font.family.heading};
  font-size: ${font.size["2xl"]};
  font-weight: normal;
`;

const Grid = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: 1fr;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-family: ${font.family.heading};
  font-size: ${font.size.sm};
  color: ${({ theme }) => theme.colors.text.primary};
`;

export { Form, Heading, Grid, Label };
