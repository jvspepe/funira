import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  width: 25rem;
  padding: 0.5rem;
  gap: 0.5rem;
`;

const ItemWrapper = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;

  padding: 0.5rem;
`;

const ItemHeader = styled.h3`
  font-family: ${({ theme }) => theme.fonts.heading};
`;

const ItemPrice = styled.span`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

const Image = styled.img`
  max-height: 10rem;
`;

const Controls = styled.div`
  display: flex;
  align-items: center;

  justify-content: space-between;
`;

export { Wrapper, ItemWrapper, ItemHeader, ItemPrice, Image, Controls };
