import { styled } from "styled-components";

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  padding: 2rem 1.5rem;
  background-color: ${({ theme }) => theme.colors.background.secondary};
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
`;

const Icon = styled.div`
  & svg {
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;

const Title = styled.h3`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: normal;
`;

export { Wrapper, Icon, Title };
