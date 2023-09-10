import { styled } from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  hr {
    border: 1px solid ${({ theme }) => theme.colors.border.primary};
  }
`;

export default Wrapper;
