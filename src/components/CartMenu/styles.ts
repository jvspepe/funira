import styled from "styled-components";

const Wrapper = styled.div`
  display: grid;
  grid-auto-rows: 1fr;
  max-height: 22rem;
  overflow-y: auto;
  & > *:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.colors.border.primary};
  }
`;

export default Wrapper;
