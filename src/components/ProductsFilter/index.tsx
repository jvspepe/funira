import { ChangeEvent } from "react";
import { useSearchParams } from "react-router-dom";
import { TCategory } from "@/@types/categories";
import SortOption from "@/@types/sort-options";
import Container from "@/components/ui/Container";
import Filters from "@/components/Filters";
import FiltersDesktop from "../FiltersDesktop";

const sortOptions: SortOption[] = [
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
  const [searchParams, setSearchParams] = useSearchParams();

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

  function handleClearFilter() {
    searchParams.delete("tipo");
    setSearchParams(searchParams);
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

  return (
    <Container>
      <Filters
        categories={categories}
        sortOptions={sortOptions}
        handleChangeFilter={handleChangeFilter}
        handleChangeSort={handleChangeSort}
        handleClearFilter={handleClearFilter}
      />
      <FiltersDesktop
        categories={categories}
        sortOptions={sortOptions}
        handleChangeFilter={handleChangeFilter}
        handleChangeSort={handleChangeSort}
        handleClearFilter={handleClearFilter}
      />
    </Container>
  );
};

export default ProductsFilter;
