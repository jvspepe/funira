import { useState } from "react";
import { CaretDown, Faders, X } from "@phosphor-icons/react";
import Button from "../Button";
import Drawer from "../Drawer";
import IconButton from "../IconButton";
import * as S from "./styles";

const DrawerSort = () => {
  const [openSort, setOpenSort] = useState(false);

  function handleOpenSort() {
    setOpenSort(!openSort);
  }

  return (
    <>
      <Button
        onClick={handleOpenSort}
        variant="secondary"
        endIcon={<CaretDown size={16} />}
      >
        Ordenar
      </Button>
      {openSort && (
        <Drawer
          isOpen={openSort}
          position="end"
          header={
            <S.Header>
              <Faders size={32} />
              <h3>Ordenar</h3>
              <IconButton onClick={handleOpenSort}>
                <X size={32} />
              </IconButton>
            </S.Header>
          }
        >
          <S.Content>
            <Button variant="secondary">Menor Preço</Button>
            <Button variant="secondary">Maior Preço</Button>
            <Button variant="secondary">Mais Vendidos</Button>
            <Button variant="secondary">Melhor Avaliados</Button>
            <Button variant="secondary">Novos</Button>
          </S.Content>
        </Drawer>
      )}
    </>
  );
};

export default DrawerSort;
