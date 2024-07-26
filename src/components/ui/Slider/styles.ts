import styled from "styled-components";

const SliderBackdrop = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0);

  transition: all 500ms ease-in-out;

  visibility: hidden;

  z-index: 9999;

  &[data-active="true"] {
    visibility: visible;
    backdrop-filter: blur(0.125rem);
    background-color: rgba(0, 0, 0, 0.5);
  }
`;

const Slider = styled.div`
  position: absolute;
  bottom: -100%;
  min-height: 50dvh;
  left: 0;
  right: 0;

  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  border-top-left-radius: 2rem;
  border-top-right-radius: 2rem;
  padding: 1.5rem;

  background-color: ${({ theme }) => theme.colors.background.primary};

  transition: all 500ms ease-in-out;

  &[data-active="true"] {
    bottom: 0;
  }
`;

const SliderToggle = styled.button`
  border: none;
  background-color: transparent;
`;

const SliderHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export { Slider, SliderBackdrop, SliderToggle, SliderHeader };
