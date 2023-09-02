import { useState } from "react";
import { CaretDown } from "@phosphor-icons/react";
import Menu from "../Menu";
import Button from "../Button";
import * as S from "./styles";

type Props = { options: string[] };
const MenuSort = ({ options }: Props) => {
  const [open, setOpen] = useState(false);
  const [sortValue, setSortValue] = useState<string>(options[0]);
  return (
    <S.Wrapper>
      <S.Text>Ordenar por:</S.Text>
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
            {sortValue}
          </Button>
        }
      >
        {options.map((option) => (
          <Button
            key={option}
            onClick={() => setSortValue(option)}
            variant="tertiary"
            size="small"
          >
            {option}
          </Button>
        ))}
      </Menu>
    </S.Wrapper>
  );
};

export default MenuSort;
