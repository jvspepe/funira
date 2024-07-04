import { Link } from "react-router-dom";
import { TProduct } from "@/@types/product";
import Container from "../Container";
import ProductCard from "../ProductCard";
import Typography from "../Typography";
import * as Styled from "./styles";

type Props = {
  title?: string;
  products: TProduct[];
  link?: string;
};

const ProductDisplay = ({ title, products, link }: Props) => {
  return (
    <Container>
      <Styled.Section>
        {title && (
          <Typography
            component="h3"
            fontFamily="heading"
            fontSize={{ _: "xl", md: "3xl" }}
          >
            {title}
          </Typography>
        )}
        <Styled.Display>
          {products.map((product) => (
            <ProductCard key={product.name} product={product} />
          ))}
        </Styled.Display>
        {link && (
          <Styled.Button component={Link} to={link} variant="secondary">
            Ver mais
          </Styled.Button>
        )}
      </Styled.Section>
    </Container>
  );
};

export default ProductDisplay;
