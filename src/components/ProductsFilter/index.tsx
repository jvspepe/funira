import { ChangeEvent, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { CaretDown, FunnelSimple, X } from "@phosphor-icons/react";
import { TCategory } from "../../@types/categories";
import Container from "../Container";
import MenuFilter from "../MenuFilter";
import Button from "../Button";
import Drawer from "../Drawer";
import Checkbox from "../Checkbox";
import IconButton from "../IconButton";
import Menu from "../Menu";
import * as Styled from "./styles";
import MenuSort from "../MenuSort";

const sortOptions = [
  { label: "Maior Preço", value: "maior-preço" },
  { label: "Menor Preço", value: "menor-preço" },
  { label: "Novos", value: "novo" },
  { label: "Mais Vendidos", value: "mais-vendidos" },
  { label: "Melhor Avaliados", value: "melhor-avaliados" },
];

type Props = {
  categories: TCategory[];
};

const ProductsFilter = ({ categories }: Props) => {
  const [openFilter, setOpenFilter] = useState(false);
  const [openSort, setOpenSort] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  function handleOpenFilter() {
    setOpenFilter(!openFilter);
  }

  function handleChangeFilter(event: ChangeEvent<HTMLInputElement>) {
    const typeParams = searchParams.getAll("tipo");
    if (typeParams.includes(event.target.value)) {
      setSearchParams({
        tipo: typeParams.filter((type) => type !== event.target.value),
      });
    } else {
      searchParams.append("tipo", event.target.value);
      setSearchParams(searchParams);
    }
  }

  function handleChangeSort(value: string) {
    const sortParams = searchParams.get("ordem");
    if (sortParams === value) {
      searchParams.delete("ordem");
      setSearchParams(searchParams);
    } else {
      searchParams.set("ordem", value);
      setSearchParams(searchParams);
    }
  }

  function handleClearFilter() {
    setSearchParams();
  }

  return (
    <Container>
      <Styled.Wrapper>
        <Button
          onClick={handleOpenFilter}
          variant="secondary"
          endIcon={<CaretDown size={16} />}
        >
          Filtros
        </Button>
        {openFilter && (
          <Drawer
            isOpen={openFilter}
            header={
              <Styled.Header>
                <FunnelSimple size={32} />
                <h3>Filtros</h3>
                <IconButton onClick={handleOpenFilter}>
                  <X size={32} />
                </IconButton>
              </Styled.Header>
            }
          >
            <Styled.Content>
              <Styled.Title>Filtros</Styled.Title>
              <Button onClick={handleClearFilter} size="small">
                Limpar filtros
              </Button>
              <Styled.List>
                {categories.map((item) => (
                  <Checkbox
                    onChange={handleChangeFilter}
                    key={item.value}
                    id={item.value}
                    name={item.value}
                    value={item.value}
                    checked={searchParams.getAll("tipo").includes(item.value)}
                    label={item.label}
                  />
                ))}
              </Styled.List>
            </Styled.Content>
          </Drawer>
        )}
        <Menu
          isOpen={openSort}
          setIsOpen={setOpenSort}
          toggle={
            <Button
              onClick={() => setOpenSort(!openSort)}
              variant="secondary"
              endIcon={<CaretDown size={16} />}
              style={{ width: "100%" }}
            >
              Ordem
            </Button>
          }
        >
          {sortOptions.map((option) => (
            <Button
              onClick={() => handleChangeSort(option.value)}
              key={option.value}
              variant="tertiary"
              size="small"
              style={{ width: "100%" }}
            >
              {option.label}
            </Button>
          ))}
        </Menu>
      </Styled.Wrapper>
      <Styled.WrapperDesktop>
        <MenuFilter categories={categories} />
        <MenuSort options={sortOptions} onClick={handleChangeSort} />
      </Styled.WrapperDesktop>
    </Container>
  );
};

export default ProductsFilter;
