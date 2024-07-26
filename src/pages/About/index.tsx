import Newsletter from "@/components/Newsletter";
import * as S from "./styles";

const About = () => {
  return (
    <div>
      <S.StyledContainer>
        <S.PageHeader>
          Uma marca construída com amor pelo artesanato, qualidade e excelente
          atendimento ao cliente.
        </S.PageHeader>
      </S.StyledContainer>

      <Newsletter />
    </div>
  );
};

export default About;
