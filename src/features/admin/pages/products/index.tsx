import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, SimpleGrid } from '@chakra-ui/react';
import { getProducts } from '@/features/products/services';
import { AdminProductCard } from '@/features/admin/components/admin-product-card';
import { AdminProductSearch } from '@/features/admin/components/admin-product-search';

const formSchema = z.object({
  label: z.string().array(),
  value: z.string(),
});

export type FormSchema = z.infer<typeof formSchema>;

export function AdminProducts() {
  const productsQuery = useQuery({
    queryKey: ['products'],
    queryFn: async () =>
      await getProducts({
        limitBy: 10,
      }),
  });

  const form = useForm<FormSchema>({
    defaultValues: {
      label: ['id'],
      value: '',
    },
    resolver: zodResolver(formSchema),
  });

  const [label, value] = form.watch(['label', 'value']);

  if (productsQuery.isLoading) {
    return <Box>Loading...</Box>;
  }

  if (productsQuery.isError) {
    return <Box>Error: {productsQuery.error.message}</Box>;
  }

  if (!productsQuery.data || productsQuery.data.length === 0) {
    return 'Nenhum produto encontrado';
  }

  const filteredProducts = productsQuery.data.filter((product) => {
    if (!label || !value) return true;

    switch (label[0]) {
      case 'id':
        return product.id.includes(value);
      case 'name':
        return product.name.pt.includes(value);
      case 'category':
        return product.category.label.pt.includes(value);
    }
  });

  return (
    <FormProvider {...form}>
      <Box
        display="flex"
        flexDirection="column"
        gap="{spacing.5}"
      >
        <AdminProductSearch />
        <SimpleGrid
          columns={2}
          gap="{spacing.5}"
        >
          {filteredProducts.map((product) => (
            <AdminProductCard
              key={product.id}
              product={product}
            />
          ))}
        </SimpleGrid>
      </Box>
    </FormProvider>
  );
}
