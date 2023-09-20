import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { CaretDown } from "@phosphor-icons/react";
import Menu from "../Menu";
import Button from "../Button";

type Props = {
  options: { label: string; value: string }[];
  onClick(value: string): void;
};

const MenuSort = ({ options, onClick }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchParams] = useSearchParams();

  return (
    <Menu
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      toggle={
        <Button
          onClick={() => setIsOpen(!isOpen)}
          variant="secondary"
          size="small"
          endIcon={<CaretDown size={16} />}
        >
          {options.find((option) => option.value === searchParams.get("ordem"))
            ?.label || "Ordem"}
        </Button>
      }
    >
      {options.map((option) => (
        <Button
          onClick={() => onClick(option.value)}
          key={option.value}
          variant="tertiary"
          size="small"
          style={{ width: "100%" }}
        >
          {option.label}
        </Button>
      ))}
    </Menu>
  );
};

export default MenuSort;
