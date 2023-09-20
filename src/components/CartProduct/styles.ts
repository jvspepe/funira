import { styled } from "styled-components";
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

export { Wrapper, Image, InnerWrapper, Information };
