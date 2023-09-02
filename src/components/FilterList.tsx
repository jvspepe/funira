import { styled } from "styled-components";
import font from "../styles/font";
import Checkbox from "./Checkbox";

type Props = { title: string; items: string[] };

const Wrapper = styled.div`
  display: grid;
  gap: 1.25rem;
  padding: 1rem;
`;

const Title = styled.span`
  color: ${({ theme }) => theme.colors.text.primary};
  font-family: ${font.family.heading};
  font-size: ${font.size.md};
`;

const List = styled.div`
  display: grid;
  gap: 0.75rem;
`;

const FilterList = ({ title, items }: Props) => {
  return (
    <Wrapper>
      <Title>{title}</Title>
      <List>
        {items.map((item) => (
          <Checkbox key={item} label={item} id={item} />
        ))}
      </List>
    </Wrapper>
  );
};

export default FilterList;
