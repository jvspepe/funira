import { styled } from "styled-components";

const Wrapper = styled.div<{ $position: "start" | "end" }>`
  background-color: ${({ theme }) => theme.colors.background.primary};
  justify-self: ${({ $position }) => ($position === "start" ? "start" : "end")};
  min-width: 80%;
  overflow-y: scroll;
`;

const Backdrop = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(0.125rem);
  position: fixed;
  inset: 0;
  display: grid;
`;

export { Backdrop, Wrapper };
