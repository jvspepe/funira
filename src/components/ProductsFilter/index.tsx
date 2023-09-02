import DrawerSort from "../DrawerSort";
import DrawerFilter from "../DrawerFilter";
import Container from "../Container";
import MenuFilter from "../MenuFilter";
import * as S from "./styles";
import MenuSort from "../MenuSort";

const categories = [
  "Cerâmicas",
  "Utensílios de mesa",
  "Mesas",
  "Cadeiras",
  "Armários",
  "Camas",
];

const rooms = ["Cozinha", "Sala", "Banheiro", "Quarto", "Ar Livre"];
const sortOptions = ["Novos", "Mais Vendidos", "Melhor Avaliados", "Todos"];

const ProductsFilter = () => {
  return (
    <Container>
      <S.Wrapper>
        <DrawerFilter />
        <DrawerSort />
      </S.Wrapper>
      <S.WrapperDesktop>
        <S.FiltersContainer>
          <MenuFilter title="Categorias" items={categories} />
          <MenuFilter title="Cômodos" items={rooms} />
          <MenuFilter title="Marca" items={categories} />
        </S.FiltersContainer>
        <MenuSort options={sortOptions} />
      </S.WrapperDesktop>
    </Container>
  );
};

export default ProductsFilter;
