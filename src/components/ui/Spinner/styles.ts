import { styled } from "styled-components";
import spin from "../../../styles/animations/spin";

const Spinner = styled.span`
  width: 1.5rem;
  height: 1.5rem;
  border: 1px solid ${({ theme }) => theme.colors.border.primary};
  border-right-color: transparent;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

export default Spinner;
