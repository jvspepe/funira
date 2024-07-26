import { ReactNode, useEffect } from "react";
import * as S from "./styles";

type Props = {
  isOpen: boolean;
  position?: "start" | "end";
  header?: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
};

const Drawer = ({
  isOpen,
  position = "start",
  header,
  footer,
  children,
}: Props) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflowY = "hidden";
    }
    return () => {
      document.body.style.overflowY = "auto";
    };
  }, [isOpen]);

  return (
    <S.Backdrop data-active={isOpen}>
      <S.Wrapper $position={position}>
        {header}
        {children}
        {footer}
      </S.Wrapper>
    </S.Backdrop>
  );
};

export default Drawer;
