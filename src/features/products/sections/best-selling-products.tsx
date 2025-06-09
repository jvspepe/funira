import { useSuspenseQuery } from '@tanstack/react-query';
import { ProductsSection } from '../components/products-section';
import { getProducts } from '../services';
import { paths } from '@/config/paths';
import { SORT_PARAM } from '@/config/constants';

export function BestSellingProducts() {
  const bestSellingProductsQuery = useSuspenseQuery({
    queryKey: ['products', 'best-selling'],
    queryFn: async () =>
      await getProducts({
        limitBy: 4,
        sortBy: ['sales', 'desc'],
      }),
  });

  return (
    <ProductsSection
      title="Mais vendidos"
      products={bestSellingProductsQuery.data}
      link={`${paths.user.products}?${SORT_PARAM}=best-selling`}
    />
  );
}
