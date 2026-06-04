import { Box, Card, Field, Input, Table } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { AdminCreateCategory } from "@/features/categories/components/create-category";
import { getCategories } from "@/features/categories/services";

const formSchema = z.object({
  category: z.string(),
});

type FormSchema = z.infer<typeof formSchema>;

const defaultValues: FormSchema = {
  category: "",
};

export function AdminCategories() {
  const categoriesQuery = useQuery({
    queryFn: getCategories,
    queryKey: ["categories"],
  });

  const form = useForm<FormSchema>({
    defaultValues,
    resolver: zodResolver(formSchema),
  });

  const value = form.watch("category");

  if (categoriesQuery.isLoading) {
    return "Carregando";
  }

  if (!categoriesQuery.data || categoriesQuery.data.length === 0) {
    return "Nenhuma categoria";
  }

  const filteredCategories = categoriesQuery.data.filter((category) => {
    if (!value) {
      return true;
    }

    return category.value.includes(value);
  });

  console.log(filteredCategories);

  return (
    <Box>
      <Card.Root>
        <Card.Header>
          <Card.Title>Categorias</Card.Title>
        </Card.Header>
        <Card.Body display="flex" flexDirection="column" gap="1rem">
          <Box display="flex" alignItems="end" justifyContent="space-between">
            <Field.Root w="fit">
              <Field.Label>
                Procurar uma categoria
                <Field.RequiredIndicator />
              </Field.Label>
              <Input
                placeholder="Nome da categoria"
                {...form.register("category")}
              />
              <Field.ErrorText />
            </Field.Root>
            <AdminCreateCategory />
          </Box>
          <Table.Root size="sm" variant="outline" showColumnBorder>
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeader>ID</Table.ColumnHeader>
                <Table.ColumnHeader>Nome</Table.ColumnHeader>
                <Table.ColumnHeader>Nome (inglês)</Table.ColumnHeader>
                <Table.ColumnHeader textAlign="end">Código</Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {filteredCategories.map((category) => (
                <Table.Row key={category.id}>
                  <Table.Cell>{category.id}</Table.Cell>
                  <Table.Cell>{category.label.pt}</Table.Cell>
                  <Table.Cell>{category.label.en}</Table.Cell>
                  <Table.Cell textAlign="end">{category.value}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </Card.Body>
      </Card.Root>
    </Box>
  );
}
