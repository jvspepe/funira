import { Link } from "react-router-dom";
import { TProduct } from "@/@types/product";
import Container from "@/components/ui/Container";
import ProductCard from "@/components/ProductCard";
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
        {title && <Styled.SectionHeader>{title}</Styled.SectionHeader>}
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
