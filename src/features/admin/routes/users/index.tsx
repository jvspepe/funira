import { useQuery } from '@tanstack/react-query';
import { Box, Card, Field, Input } from '@chakra-ui/react';
import { getUsers } from '@/features/users/services';
import { AdminUsersTable } from '@/features/admin/components/admin-users-table';

export function AdminUsers() {
  const usersQuery = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
  });

  if (usersQuery.isLoading) {
    return 'Carregando';
  }

  if (usersQuery.isError) {
    return `Algo deu errado: ${usersQuery.error.message}`;
  }

  if (!usersQuery.data) {
    return 'Nenhum dado encontrado';
  }

  return (
    <Box>
      <Card.Root>
        <Card.Header>
          <Card.Title>Usuários</Card.Title>
        </Card.Header>
        <Card.Body
          display="flex"
          flexDirection="column"
          gap="1rem"
        >
          <Box
            display="flex"
            alignItems="end"
            justifyContent="space-between"
          >
            <Field.Root w="fit">
              <Field.Label>
                Buscar usuário
                <Field.RequiredIndicator />
              </Field.Label>
              <Input placeholder="Nome do usuário" />
              <Field.ErrorText />
            </Field.Root>
          </Box>
          <AdminUsersTable users={usersQuery.data} />
        </Card.Body>
      </Card.Root>
    </Box>
  );
}
