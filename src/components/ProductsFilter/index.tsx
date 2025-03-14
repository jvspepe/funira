import { useSearchParams } from 'react-router-dom';
import { Container } from '@chakra-ui/react';
import { TCategory } from '@/@types/categories';
import SortOption from '@/@types/sort-options';
import Filters from '@/components/Filters';
import FiltersDesktop from '@/components/FiltersDesktop';

const sortOptions: SortOption[] = [
  { label: 'Maior Preço', value: 'maior-preço' },
  { label: 'Menor Preço', value: 'menor-preço' },
  { label: 'Novos', value: 'novo' },
  { label: 'Mais Vendidos', value: 'mais-vendidos' },
  { label: 'Melhor Avaliados', value: 'melhor-avaliados' },
];

type Props = {
  categories: TCategory[];
};

const ProductsFilter = ({ categories }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();

  function handleChangeFilter(filters: string[]) {
    setSearchParams({
      tipo: filters,
    });
  }

  function handleChangeFilterValues() {
    const values: string[] = [];
    const typeParams = searchParams.getAll('tipo');

    if (!typeParams) return [];

    categories.forEach((category) => {
      if (typeParams.includes(category.value)) {
        values.push(category.value);
      }
    });

    return values;
  }

  function handleChangeSort(value: string) {
    const sortParams = searchParams.get('ordem');
    if (sortParams === value) {
      searchParams.delete('ordem');
      setSearchParams(searchParams);
    } else {
      searchParams.set('ordem', value);
      setSearchParams(searchParams);
    }
  }

  return (
    <Container
      maxW={{
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        xxl: '1440px',
      }}
      p={0}
    >
      <Filters
        searchParams={searchParams}
        categories={categories}
        sortOptions={sortOptions}
        handleChangeFilter={handleChangeFilter}
        handleChangeFilterValues={handleChangeFilterValues}
        handleChangeSort={handleChangeSort}
      />
      <FiltersDesktop
        searchParams={searchParams}
        categories={categories}
        sortOptions={sortOptions}
        handleChangeFilter={handleChangeFilter}
        handleChangeFilterValues={handleChangeFilterValues}
        handleChangeSort={handleChangeSort}
      />
    </Container>
  );
};

export default ProductsFilter;
