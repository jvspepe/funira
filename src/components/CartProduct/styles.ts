import { styled } from "styled-components";
import font from "../../styles/font";
import BaseStepper from "../Stepper";
import breakpoints from "../../styles/breakpoints";

const Wrapper = styled.div`
  display: flex;
  gap: 1.5rem;
`;

const Image = styled.img`
  max-width: 7.5rem;
  object-fit: cover;
`;

const Information = styled.div`
  max-height: 10rem;
  display: flex;
  flex-direction: column;
  text-overflow: ellipsis;
  white-space: break-spaces;
  overflow: hidden;
  gap: 0.5rem;
`;

const Title = styled.h3`
  color: ${({ theme }) => theme.colors.text.primary};
  font-family: ${font.family.heading};
  font-size: ${font.size.md};
  font-weight: normal;

  @media (min-width: ${breakpoints.sm}) {
    font-size: ${font.size.lg};
  }
`;

const Description = styled.p`
  color: ${({ theme }) => theme.colors.text.primary};
  font-family: ${font.family.body};
  font-size: ${font.size.sm};
`;

const Price = styled.span`
  color: ${({ theme }) => theme.colors.text.primary};
  font-family: ${font.family.body};
  font-size: ${font.size.md};
`;

const OuterPrice = styled(Price)`
  display: none;
  @media (min-width: ${breakpoints.md}) {
    display: block;
  }
`;

const InnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;

  @media (min-width: ${breakpoints.md}) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

const Stepper = styled(BaseStepper)``;

export {
  Wrapper,
  Image,
  InnerWrapper,
  Information,
  Title,
  Description,
  Price,
  OuterPrice,
  Stepper,
};
