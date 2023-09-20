import styled from "styled-components";

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

const Buttons = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export { Wrapper, InnerWrapper, Image, Buttons };
