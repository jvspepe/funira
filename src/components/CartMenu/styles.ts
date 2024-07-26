import breakpoints from "@/styles/breakpoints";
import styled from "styled-components";

const Wrapper = styled.div`
  display: none;

  @media (min-width: ${breakpoints.md}) {
    display: block;
  }
`;

const MenuContent = styled.div`
  display: grid;
  grid-auto-rows: 1fr;
  max-height: 22rem;
  overflow-y: auto;
  & > *:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.colors.border.primary};
  }
`;

const MenuMessage = styled.p`
  padding: 0.5rem;
`;

export { Wrapper, MenuContent, MenuMessage };
