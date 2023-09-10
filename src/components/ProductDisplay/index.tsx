import { Link } from "react-router-dom";
import { TProduct } from "../../@types/product";
import Container from "../Container";
import ProductCard from "../ProductCard";
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
        {title && <Styled.Heading>{title}</Styled.Heading>}
        <Styled.Display>
          {products.map((product) => (
            <ProductCard key={product.title} product={product} />
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
