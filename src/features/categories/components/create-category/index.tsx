import { Button, Dialog, Portal } from '@chakra-ui/react';

import { CreateCategoryForm } from './form';

export function AdminCreateCategory() {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button variant="outline">Adicionar categoria</Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <CreateCategoryForm />
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
