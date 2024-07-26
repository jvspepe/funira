import styled from "styled-components";
import breakpoints from "@/styles/breakpoints";

const Wrapper = styled.div`
  display: none;
  justify-content: space-between;
  padding: 0.5rem 0;

  @media (min-width: ${breakpoints.sm}) {
    display: flex;
  }
`;

const FilterDropdown = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  width: 100%;
  gap: 0.75rem;
`;

export { Wrapper, FilterDropdown };
