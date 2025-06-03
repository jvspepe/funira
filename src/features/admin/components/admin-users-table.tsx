import { User } from '@/@types/models';
import { Table, Text } from '@chakra-ui/react';

interface AdminUsersTableProps {
  users: User[];
}

export function AdminUsersTable({ users }: AdminUsersTableProps) {
  return (
    <Table.Root
      size="sm"
      variant="outline"
      showColumnBorder
    >
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeader>ID</Table.ColumnHeader>
          <Table.ColumnHeader>E-mail</Table.ColumnHeader>
          <Table.ColumnHeader>Nome</Table.ColumnHeader>
          <Table.ColumnHeader>Cargo</Table.ColumnHeader>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {users.length === 0 ? (
          <Text>Nenhum usuário encontrado</Text>
        ) : (
          users.map((user) => (
            <Table.Row key={user.id}>
              <Table.Cell>{user.id}</Table.Cell>
              <Table.Cell>{user.email}</Table.Cell>
              <Table.Cell>{user.username}</Table.Cell>
              <Table.Cell>{user.role}</Table.Cell>
            </Table.Row>
          ))
        )}
      </Table.Body>
    </Table.Root>
  );
}
