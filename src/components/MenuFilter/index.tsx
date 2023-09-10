import { ChangeEvent, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { CaretDown } from "@phosphor-icons/react";
import { TCategory } from "../../@types/categories";
import Menu from "../Menu";
import Button from "../Button";
import Checkbox from "../Checkbox";
import FilterDropdown from "./styles";

type Props = {
  categories: TCategory[];
};

const MenuFilter = ({ categories }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [open, setOpen] = useState(false);

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

  return (
    <>
      <Menu
        isOpen={open}
        setIsOpen={setOpen}
        position="left"
        toggle={
          <Button
            onClick={() => setOpen(!open)}
            variant="secondary"
            size="small"
            endIcon={<CaretDown size={16} />}
          >
            Filtros
          </Button>
        }
      >
        <FilterDropdown>
          {categories.map((category) => (
            <Checkbox
              onChange={handleChangeFilter}
              key={category.value}
              variant="small"
              label={category.label}
              id={category.value}
              value={category.value}
              checked={searchParams.getAll("tipo").includes(category.value)}
            />
          ))}
        </FilterDropdown>
      </Menu>
    </>
  );
};

export default MenuFilter;
