import { useState } from "react";
import Menu from "../Menu";
import Button from "../Button";
import { CaretDown } from "@phosphor-icons/react";
import Checkbox from "../Checkbox";
import FilterDropdown from "./styles";

type Props = { title: string; items: string[] };

const MenuFilter = ({ title, items }: Props) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Menu
        isOpen={open}
        setIsOpen={setOpen}
        position="left"
        toggle={
          <Button
            onClick={() => setOpen(!open)}
            variant="tertiary"
            size="small"
            endIcon={<CaretDown size={16} />}
          >
            {title}
          </Button>
        }
      >
        <FilterDropdown>
          {items.map((menuItem) => (
            <Checkbox
              key={menuItem}
              variant="small"
              label={menuItem}
              id={menuItem}
            />
          ))}
        </FilterDropdown>
      </Menu>
    </>
  );
};

export default MenuFilter;
