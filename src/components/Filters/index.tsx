import { ChangeEvent, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { TCategory } from "@/@types/categories";
import SortOption from "@/@types/sort-options";
import { CaretDown } from "@phosphor-icons/react";
import Button from "../ui/Button";
import Checkbox from "../ui/Checkbox";
import Slider from "@/components/ui/Slider";
import * as Styled from "./styles";

type Props = {
  categories: TCategory[];
  sortOptions: SortOption[];
  handleChangeFilter(event: ChangeEvent<HTMLInputElement>): void;
  handleChangeSort(value: string): void;
  handleClearFilter(): void;
};

const Filters = ({
  categories,
  sortOptions,
  handleChangeFilter,
  handleChangeSort,
  handleClearFilter,
}: Props) => {
  const [openFilter, setOpenFilter] = useState(false);
  const [openSort, setOpenSort] = useState(false);
  const [searchParams] = useSearchParams();

  function handleOpenFilter() {
    setOpenFilter(!openFilter);
  }

  function handleOpenSort() {
    setOpenSort(!openSort);
  }

  return (
    <Styled.Wrapper>
      <Button onClick={handleOpenFilter} variant="secondary">
        Filtros
        <CaretDown size={16} />
      </Button>
      <Slider
        isActive={openFilter}
        setIsActive={setOpenFilter}
        header={<h2>Filtros</h2>}
      >
        <div>
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
        </div>
        <Button onClick={() => handleClearFilter()} type="button">
          Limpar Filtros
        </Button>
      </Slider>
      <Button onClick={handleOpenSort} variant="secondary">
        Ordem
        <CaretDown size={16} />
      </Button>
      <Slider
        isActive={openSort}
        setIsActive={setOpenSort}
        header={<h2>Ordem</h2>}
      >
        <div>
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
        </div>
      </Slider>
    </Styled.Wrapper>
  );
};

export default Filters;
