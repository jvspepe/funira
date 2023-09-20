import { Dispatch, ReactNode, SetStateAction, useEffect, useRef } from "react";
import * as S from "./styles";
import { LayoutProps } from "styled-system";

export type Props = LayoutProps & {
  toggle: ReactNode;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  position?: "left" | "middle" | "right";
  children: ReactNode;
  className?: string;
};

const Menu = ({
  toggle,
  isOpen,
  setIsOpen,
  position = "middle",
  children,
  className,
  ...props
}: Props) => {
  const ref = useRef<HTMLDivElement>(null);

  function handleClickOut(event: MouseEvent) {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOut);

    return () => {
      document.removeEventListener("mousedown", handleClickOut);
    };
  });

  return (
    <S.Wrapper className={className} ref={ref} {...props}>
      {toggle}
      {isOpen && <S.Dropdown $position={position}>{children}</S.Dropdown>}
    </S.Wrapper>
  );
};

export default Menu;
