import { useState } from "react";
import { CaretDown, FunnelSimple, X } from "@phosphor-icons/react";
import Button from "../Button";
import Drawer from "../Drawer";
import FilterList from "../FilterList";
import IconButton from "../IconButton";
import * as S from "./styles";

const filters = [
  "Cerâmicas",
  "Utensílios de mesa",
  "Mesas",
  "Cadeiras",
  "Armários",
  "Camas",
];

const DrawerFilter = () => {
  const [openFilter, setOpenFilter] = useState(false);

  function handleOpenFilter() {
    setOpenFilter(!openFilter);
  }

  return (
    <>
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
            <S.Header>
              <FunnelSimple size={32} />
              <h3>Filtros</h3>
              <IconButton onClick={handleOpenFilter}>
                <X size={32} />
              </IconButton>
            </S.Header>
          }
        >
          <S.Content>
            <FilterList title="Tipos" items={filters} />
          </S.Content>
        </Drawer>
      )}
    </>
  );
};

export default DrawerFilter;
