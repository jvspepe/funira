import Typography from "../Typography";
import Wrapper from "./styles";

const ProductsHeader = () => {
  return (
    <Wrapper>
      <Typography
        component="h2"
        fontFamily="heading"
        fontSize="4xl"
        textAlign="center"
      >
        Nossos produtos
      </Typography>
    </Wrapper>
  );
};

export default ProductsHeader;
