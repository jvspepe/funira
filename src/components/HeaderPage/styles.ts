import { styled } from "styled-components";

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.background.secondary};
  background-image: url("/images/product-header.jpg");
  background-size: cover;
  background-position: center;
  padding-block: 4rem 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default Wrapper;
