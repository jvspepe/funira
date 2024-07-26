import styled from "styled-components";
import Container from "@/components/ui/Container";
import breakpoints from "@/styles/breakpoints";

const StyledContainer = styled(Container)`
  padding: 2rem 1.5rem;

  @media (min-width: ${breakpoints.md}) {
    padding: 4rem 0;
  }
`;

const PageHeader = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes["2xl"]};
  color: ${({ theme }) => theme.colors.text.primary};
  font-weight: normal;

  @media (min-width: ${breakpoints.md}) {
    font-size: ${({ theme }) => theme.fontSizes["4xl"]};
  }
`;

export { StyledContainer, PageHeader };
