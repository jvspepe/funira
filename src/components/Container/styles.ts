import { styled } from "styled-components";
import breakpoints from "../../styles/breakpoints";

const StyledContainer = styled.div`
  width: 100%;
  margin-inline: auto;

  @media (min-width: ${breakpoints.sm}) {
    max-width: ${breakpoints.sm};
  }

  @media (min-width: ${breakpoints.md}) {
    max-width: ${breakpoints.md};
  }

  @media (min-width: ${breakpoints.lg}) {
    max-width: ${breakpoints.lg};
  }

  @media (min-width: ${breakpoints.xl}) {
    max-width: ${breakpoints.xl};
  }

  @media (min-width: ${breakpoints.xxl}) {
    max-width: ${breakpoints.xxl};
  }
`;

export default StyledContainer;
