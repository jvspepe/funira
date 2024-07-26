import breakpoints from "@/styles/breakpoints";
import { Link as RouterLink } from "react-router-dom";
import { styled } from "styled-components";

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

const ProductName = styled.h3`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: normal;
  width: 100%;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;

  @media (min-width: ${breakpoints.lg}) {
    font-size: ${({ theme }) => theme.fontSizes.xl};
  }
`;

const ProductPrice = styled.p`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: ${({ theme }) => theme.fontSizes.sm};

  @media (min-width: ${breakpoints.lg}) {
    font-size: ${({ theme }) => theme.fontSizes.lg};
  }
`;

const Link = styled(RouterLink)`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  text-decoration: none;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  &:hover ${Image} {
    transform: scale(1.05);
  }
`;

export { Link, Image, Details, ProductName, ProductPrice };
