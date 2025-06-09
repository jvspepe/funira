import { useSuspenseQuery } from '@tanstack/react-query';
import { ProductsSection } from '../components/products-section';
import { getProducts } from '../services';
import { paths } from '@/config/paths';
import { SORT_PARAM } from '@/config/constants';

export function LatestProducts() {
  const latestProductsQuery = useSuspenseQuery({
    queryKey: ['products', 'best-selling'],
    queryFn: async () =>
      await getProducts({
        limitBy: 4,
        sortBy: ['createdAt', 'desc'],
      }),
  });

  return (
    <ProductsSection
      title="Mais recentes"
      products={latestProductsQuery.data}
      link={`${paths.user.products}?${SORT_PARAM}=latest`}
    />
  );
}
