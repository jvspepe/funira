import { styled } from "styled-components";

const Form = styled.form`
  display: grid;
  gap: 1rem;
  padding: 1.5rem;
`;

const Grid = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: 1fr;
  gap: 0.5rem;
`;

export { Form, Grid };
