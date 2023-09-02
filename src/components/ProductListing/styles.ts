import { styled } from "styled-components";
import font from "../../styles/font";
import breakpoints from "../../styles/breakpoints";

const Wrapper = styled.div`
  display: grid;

  @media (min-width: ${breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const Image = styled.img`
  width: 100%;
  object-fit: cover;
  height: 100%;
  max-height: 40rem;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 1.5rem;
  @media (min-width: ${breakpoints.sm}) {
    padding: 1.5rem 0;
  }
  @media (min-width: ${breakpoints.md}) {
    padding: 0 2.5rem;
    gap: 3rem;
  }
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  color: ${({ theme }) => theme.colors.text.primary};
  font-family: ${font.family.heading};
  font-size: ${font.size["2xl"]};
  font-weight: normal;
  @media (min-width: ${breakpoints.md}) {
    font-size: ${font.size["4xl"]};
  }
`;

const Price = styled.span`
  color: ${({ theme }) => theme.colors.text.primary};
  font-family: ${font.family.heading};
  font-size: ${font.size.xl};
  @media (min-width: ${breakpoints.md}) {
    font-size: ${font.size["2xl"]};
  }
`;

const Description = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const DescriptionHeader = styled.h3`
  color: ${({ theme }) => theme.colors.text.primary};
  font-family: ${font.family.heading};
  font-size: ${font.size.md};
  font-weight: normal;
  @media (min-width: ${breakpoints.md}) {
    font-size: ${font.size.xl};
  }
`;
const DescriptionBody = styled.p`
  color: ${({ theme }) => theme.colors.text.primary};
  font-family: ${font.family.body};
  font-size: ${font.size.md};
  @media (min-width: ${breakpoints.md}) {
    font-size: ${font.size.md};
  }
`;

const Dimensions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const DimensionsHeader = styled.h4`
  color: ${({ theme }) => theme.colors.text.primary};
  font-family: ${font.family.heading};
  font-size: ${font.size.md};
  font-weight: normal;
  @media (min-width: ${breakpoints.md}) {
    font-size: ${font.size.xl};
  }
`;

const DimensionsContent = styled.div`
  color: ${({ theme }) => theme.colors.text.primary};
  font-family: ${font.family.body};
  font-size: ${font.size.md};
  display: flex;
  justify-content: space-between;
  gap: 1rem;

  div {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    text-align: center;
  }

  div:first-child {
    text-align: start;
  }

  div:last-child {
    text-align: end;
  }

  hr {
    border: 1px solid ${({ theme }) => theme.colors.border.primary};
  }
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (min-width: ${breakpoints.md}) {
    flex-direction: row;
  }
`;

export {
  Wrapper,
  Image,
  Details,
  Header,
  Title,
  Price,
  Description,
  DescriptionHeader,
  DescriptionBody,
  Dimensions,
  DimensionsHeader,
  DimensionsContent,
  Buttons,
};
