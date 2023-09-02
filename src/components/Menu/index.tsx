import { Dispatch, ReactNode, SetStateAction, useEffect, useRef } from "react";
import * as S from "./styles";

export type Props = {
  toggle: ReactNode;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  position?: "left" | "middle" | "right";
  children: ReactNode;
};

const Menu = ({
  toggle,
  isOpen,
  setIsOpen,
  position = "middle",
  children,
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
    <S.Wrapper ref={ref}>
      {toggle}
      {isOpen && <S.Dropdown $position={position}>{children}</S.Dropdown>}
    </S.Wrapper>
  );
};

export default Menu;
