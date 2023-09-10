import {
  FacebookLogo,
  InstagramLogo,
  LinkedinLogo,
} from "@phosphor-icons/react";
import * as Styled from "./styles";

const Copyright = () => {
  return (
    <Styled.Wrapper>
      <Styled.Text>Copyright 2023 &copy; Avion LTDA.</Styled.Text>
      <Styled.Socials>
        <LinkedinLogo size={24} weight="fill" />
        <FacebookLogo size={24} weight="fill" />
        <InstagramLogo size={24} />
      </Styled.Socials>
    </Styled.Wrapper>
  );
};

export default Copyright;
