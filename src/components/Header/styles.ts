import { styled } from "styled-components";

const Wrapper = styled.header`
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  padding-inline: 1.5rem;
  background-color: ${({ theme }) => theme.colors.background.primary};
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export { Wrapper, Controls };
