import Button from "../Button";
import Container from "../Container";
import * as S from "./styles";

const ProductListing = () => {
  return (
    <Container>
      <S.Wrapper>
        <S.Image src="/images/product-3.jpg" alt="" />
        <S.Details>
          <S.Header>
            <S.Title>Cadeira Preta</S.Title>
            <S.Price>
              {Intl.NumberFormat("pt-BR", {
                currency: "BRL",
                style: "currency",
              }).format(150)}
            </S.Price>
          </S.Header>
          <S.Description>
            <S.DescriptionHeader>Descrição</S.DescriptionHeader>
            <S.DescriptionBody>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Doloribus facere odio modi possimus nam vel temporibus eum libero
              voluptatibus! Voluptas.
            </S.DescriptionBody>
          </S.Description>
          <S.Dimensions>
            <S.DimensionsHeader>Dimensões</S.DimensionsHeader>
            <S.DimensionsContent>
              <div>
                <span>Altura</span>
                <span>110cm</span>
              </div>
              <hr />
              <div>
                <span>Largura</span>
                <span>75cm</span>
              </div>
              <hr />
              <div>
                <span>Comprimento</span>
                <span>50cm</span>
              </div>
            </S.DimensionsContent>
          </S.Dimensions>
          <S.Buttons>
            <Button>Adicionar ao carrinho</Button>
            <Button>Adicionar ao carrinho</Button>
          </S.Buttons>
        </S.Details>
      </S.Wrapper>
    </Container>
  );
};

export default ProductListing;
