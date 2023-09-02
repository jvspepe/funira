import { Link as RouterLink } from "react-router-dom";
import { styled } from "styled-components";
import font from "../../styles/font";
import breakpoints from "../../styles/breakpoints";

const Image = styled.img`
  flex-grow: 1;
  object-fit: cover;
  transition: transform 200ms;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Title = styled.h3`
  color: ${({ theme }) => theme.colors.text.primary};
  font-family: ${font.family.heading};
  font-size: ${font.size.lg};
  font-weight: normal;

  @media (min-width: ${breakpoints.lg}) {
    font-size: ${font.size.xl};
  }
`;

const Price = styled.span`
  color: ${({ theme }) => theme.colors.text.primary};
  font-family: ${font.family.body};
  font-size: ${font.size.sm};
  @media (min-width: ${breakpoints.lg}) {
    font-size: ${font.size.lg};
  }
`;

const Link = styled(RouterLink)`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  text-decoration: none;

  &:hover ${Image} {
    transform: scale(1.025);
  }
`;

export { Link, Image, Details, Title, Price };
