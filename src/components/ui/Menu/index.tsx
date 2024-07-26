import { Dispatch, ReactNode, SetStateAction, useRef } from "react";
import useClickAway from "@/hooks/useClickAway";
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
  useClickAway(ref, setIsOpen);

  return (
    <S.Wrapper ref={ref}>
      {toggle}
      <S.Dropdown data-is-active={isOpen} $position={position}>
        {children}
      </S.Dropdown>
    </S.Wrapper>
  );
};

export default Menu;
