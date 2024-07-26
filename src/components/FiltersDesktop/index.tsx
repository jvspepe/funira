import { ChangeEvent, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { FunnelSimple, Sliders } from "@phosphor-icons/react";
import { TCategory } from "@/@types/categories";
import SortOption from "@/@types/sort-options";
import Button from "../ui/Button";
import Checkbox from "../ui/Checkbox";
import Menu from "../ui/Menu";
import * as S from "./styles";

type Props = {
  categories: TCategory[];
  sortOptions: SortOption[];
  handleChangeFilter(event: ChangeEvent<HTMLInputElement>): void;
  handleChangeSort(value: string): void;
  handleClearFilter(): void;
};

const FiltersDesktop = ({
  categories,
  sortOptions,
  handleChangeFilter,
  handleChangeSort,
  handleClearFilter,
}: Props) => {
  const [openFilter, setOpenFilter] = useState(false);
  const [openSort, setOpenSort] = useState(false);
  const [searchParams] = useSearchParams();

  return (
    <S.Wrapper>
      <Menu
        isOpen={openFilter}
        setIsOpen={setOpenFilter}
        position="left"
        toggle={
          <Button
            onClick={() => setOpenFilter(!openFilter)}
            variant="secondary"
            size="small"
          >
            Filtros
            <Sliders weight="fill" size={20} />
          </Button>
        }
      >
        <S.FilterDropdown>
          {categories.map((category) => (
            <Checkbox
              onChange={handleChangeFilter}
              key={category.value}
              label={category.label}
              id={category.value}
              value={category.value}
              checked={searchParams.getAll("tipo").includes(category.value)}
            />
          ))}
          <Button
            onClick={() => handleClearFilter()}
            type="button"
            size="small"
          >
            Limpar filtros
          </Button>
        </S.FilterDropdown>
      </Menu>
      <Menu
        isOpen={openSort}
        setIsOpen={setOpenSort}
        position="right"
        toggle={
          <Button
            onClick={() => setOpenSort(!openSort)}
            variant="secondary"
            size="small"
          >
            {sortOptions.find(
              (option) => option.value === searchParams.get("ordem")
            )?.label || "Ordem"}
            <FunnelSimple weight="bold" size={20} />
          </Button>
        }
      >
        {sortOptions.map((option) => (
          <Button
            onClick={() => handleChangeSort(option.value)}
            key={option.value}
            variant="secondary"
            size="small"
            style={{ width: "100%" }}
          >
            {option.label}
          </Button>
        ))}
      </Menu>
    </S.Wrapper>
  );
};

export default FiltersDesktop;
