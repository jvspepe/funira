import styled from "styled-components";
import font from "../../styles/font";

const Wrapper = styled.div`
  display: flex;
  width: 25rem;
  padding: 0.5rem;
  gap: 0.5rem;
`;

const InnerWrapper = styled.div`
  display: flex;
  width: 100%;

  padding: 0.5rem;
  flex-direction: column;
`;

const Image = styled.img`
  max-height: 10rem;
`;

const Heading = styled.h6`
  color: ${({ theme }) => theme.colors.text.primary};
  font-family: ${font.family.heading};
  font-size: ${font.size.md};
  font-weight: normal;
`;

const Price = styled.span`
  color: ${({ theme }) => theme.colors.text.primary};
  font-family: ${font.family.heading};
  font-size: ${font.size.sm};
  flex-grow: 1;
`;

const Buttons = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export { Wrapper, InnerWrapper, Image, Heading, Price, Buttons };
