import { Dispatch, ReactNode, SetStateAction, useRef } from "react";
import * as S from "./styles";
import { X } from "@phosphor-icons/react";
import useClickAway from "@/hooks/useClickAway";

type Props = {
  isActive: boolean;
  setIsActive: Dispatch<SetStateAction<boolean>>;
  header?: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
};

const Slider = ({ isActive, setIsActive, header, footer, children }: Props) => {
  const ref = useRef<HTMLDivElement>(null);

  useClickAway(ref, setIsActive);

  return (
    <S.SliderBackdrop data-active={isActive}>
      <S.Slider ref={ref} data-active={isActive}>
        <S.SliderHeader>
          {header}
          <S.SliderToggle onClick={() => setIsActive(false)}>
            <X size={32} />
          </S.SliderToggle>
        </S.SliderHeader>
        {children}
        {footer}
      </S.Slider>
    </S.SliderBackdrop>
  );
};

export default Slider;
