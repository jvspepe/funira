import Typography from "@/components/ui/Typography";
import Wrapper from "./styles";

const ProductsHeader = () => {
  return (
    <Wrapper>
      <Typography
        component="h2"
        fontFamily="heading"
        fontSize="4xl"
        textAlign="center"
        variant="secondary"
      >
        Nossos produtos
      </Typography>
    </Wrapper>
  );
};

export default ProductsHeader;
