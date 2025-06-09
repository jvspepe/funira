import { getProduct } from '@/features/products/services';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';
import { EditProductForm } from './edit-product-form';

export function EditProductPage() {
  const { productId } = useParams();

  const productQuery = useQuery({
    queryKey: ['product', productId],
    queryFn: async () => await getProduct(productId!),
  });

  if (productQuery.isLoading) {
    return <div>Loading...</div>;
  }

  if (productQuery.isError) {
    return <div>Error</div>;
  }

  if (!productQuery.data) {
    return <div>Produto não encontrado</div>;
  }

  return (
    <>
      <EditProductForm product={productQuery.data} />
    </>
  );
}
