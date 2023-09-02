import { styled } from "styled-components";
import breakpoints from "../../styles/breakpoints";

const StyledContainer = styled.div`
  width: 100%;
  margin-inline: auto;

  @media (min-width: ${breakpoints.sm}) {
    max-width: 640px;
  }

  @media (min-width: ${breakpoints.md}) {
    max-width: 768px;
  }

  @media (min-width: ${breakpoints.lg}) {
    max-width: 1024px;
  }

  @media (min-width: ${breakpoints.xl}) {
    max-width: 1280px;
  }

  @media (min-width: ${breakpoints.xxl}) {
    max-width: 1536px;
  }
`;

export default StyledContainer;
