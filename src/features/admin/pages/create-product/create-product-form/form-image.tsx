import { useFormContext } from 'react-hook-form';
import { Box, FileUpload, Icon } from '@chakra-ui/react';
import { CreateProductSchema } from './form-schema.ts';
import { LuUpload } from 'react-icons/lu';

const FormImage = () => {
  const form = useFormContext<CreateProductSchema>();

  const imageCover = form.register('imageCover');

  return (
    <FileUpload.Root {...imageCover}>
      <FileUpload.HiddenInput />
      <FileUpload.Dropzone
        width="full"
        height="full"
      >
        <Icon
          size="md"
          color="fg.muted"
        >
          <LuUpload />
        </Icon>
        <FileUpload.DropzoneContent>
          <Box>Arraste arquivos ou clique aqui (máximo 5 arquivos)</Box>
          <Box color="fg.muted">.png, .jpg up to 5MB</Box>
        </FileUpload.DropzoneContent>
      </FileUpload.Dropzone>
      <FileUpload.List />
    </FileUpload.Root>
  );
};

export default FormImage;
