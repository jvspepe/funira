import { styled } from "styled-components";
import breakpoints from "../../styles/breakpoints";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  padding-block: 1.25rem;
  padding-inline: 1.5rem;

  @media (min-width: ${breakpoints.sm}) {
    display: none;
    padding-inline: 0;
  }
`;

const WrapperDesktop = styled.div`
  display: none;
  justify-content: space-between;
  padding: 0.5rem 0;
  @media (min-width: ${breakpoints.sm}) {
    display: flex;
  }
`;

const FiltersContainer = styled.div`
  display: flex;
`;

export { Wrapper, WrapperDesktop, FiltersContainer };
