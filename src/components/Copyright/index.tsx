import {
  FacebookLogo,
  InstagramLogo,
  LinkedinLogo,
} from "@phosphor-icons/react";
import * as S from "./styles";

const Copyright = () => {
  return (
    <S.Wrapper>
      <span>Copyright 2023 &copy; Avion LTDA.</span>
      <S.Socials>
        <LinkedinLogo size={24} weight="fill" />
        <FacebookLogo size={24} weight="fill" />
        <InstagramLogo size={24} />
      </S.Socials>
    </S.Wrapper>
  );
};

export default Copyright;
