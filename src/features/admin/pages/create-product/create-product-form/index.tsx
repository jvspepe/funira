/* eslint-disable react-x/no-array-index-key */
import { type ReactNode, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';
import { type SubmitHandler, FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { DevTool } from '@hookform/devtools';
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  Steps,
  StepsChangeDetails,
} from '@chakra-ui/react';
import { toaster } from '@/components/ui/toaster';
import { getCategories } from '@/features/categories/services';
import { createProduct } from '@/features/products/services';
import FormMain from './form-main';
import FormDetails from './form-details';
import FormImage from './form-image';
import {
  type CreateProductSchema,
  createProductSchema,
  defaultValues,
} from './form-schema';

type DotNestedKeys<T> = {
  [K in keyof T & (string | number)]: T[K] extends object
    ? T[K] extends unknown[]
      ? `${K}`
      : T[K] extends FileList | Date
        ? `${K}`
        : `${K}` | `${K}.${DotNestedKeys<T[K]>}`
    : `${K}`;
}[keyof T & (string | number)];

type StepKey = z.infer<typeof createProductSchema>;

type NestedStepKey = DotNestedKeys<StepKey>;

interface Step {
  content: ReactNode;
  fields: NestedStepKey[];
}

const steps: Step[] = [
  {
    content: <FormMain />,
    fields: [
      'name.pt',
      'summary.pt',
      'description.pt',
      'name.en',
      'summary.en',
      'description.en',
    ],
  },
  {
    content: <FormDetails />,
    fields: [
      'price',
      'category',
      'dimensions.depth',
      'dimensions.height',
      'dimensions.width',
    ],
  },
  {
    content: <FormImage />,
    fields: ['imageCover'],
  },
];

const CreateProductForm = () => {
  const [step, setStep] = useState(0);

  const form = useForm<CreateProductSchema>({
    defaultValues,
    resolver: zodResolver(createProductSchema),
  });

  const categoriesQuery = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });

  const handleOnStepChange = async (event: StepsChangeDetails) => {
    if (event.step > step) {
      const currentStepFields = steps[step].fields;
      const isValid = await form.trigger(currentStepFields);

      if (isValid) {
        setStep(event.step);
      }
    } else {
      setStep(event.step);
    }
  };

  const onSubmit: SubmitHandler<CreateProductSchema> = (data) => {
    if (!data.imageCover) throw new Error('Imagem obrigatória');

    if (!categoriesQuery.data) throw new Error('Nenhuma categoria encontrada');

    const categoryIndex = categoriesQuery.data.findIndex(
      (category) => category.id === data.category[0]
    );

    if (categoryIndex < 0)
      throw new Error('Nenhuma categoria encontrada no índice');

    toaster.promise(
      createProduct({
        name: data.name,
        price: z.coerce.number().parse(data.price),
        category: categoriesQuery.data[categoryIndex],
        summary: data.summary,
        description: data.description,
        dimensions: {
          depth: data.dimensions.depth,
          height: data.dimensions.height,
          width: data.dimensions.width,
        },
        imageCover: data.imageCover[0],
        images: [],
      }),
      {
        success: {
          title: 'Produto adicionado com sucesso',
        },
        error(arg) {
          console.log(arg);
          return {
            title: arg.message,
          };
        },
        loading: {
          title: 'Carregando...',
        },
        finally: () => form.reset(),
      }
    );
  };

  return (
    <>
      <DevTool control={form.control} />
      <FormProvider {...form}>
        <Steps.Root
          step={step}
          onStepChange={handleOnStepChange}
          count={steps.length - 1}
          variant="subtle"
        >
          <Card.Root
            as="form"
            onSubmit={form.handleSubmit(onSubmit)}
            width="clamp(20rem, 100%, 40rem)"
          >
            <Card.Header>
              <Card.Title>Adicionar novo produto</Card.Title>
              <Steps.List>
                {steps.map((_step, index) => (
                  <Steps.Item
                    key={index}
                    index={index}
                  >
                    <Steps.Indicator />
                    <Steps.Separator />
                  </Steps.Item>
                ))}
              </Steps.List>
            </Card.Header>
            <Card.Body
              paddingX={{
                base: '1.25rem',
              }}
            >
              <Box
                display="flex"
                flexDirection="column"
                gap="1rem"
              >
                {steps.map((step, index) => (
                  <Steps.Content
                    key={index}
                    index={index}
                  >
                    {step.content}
                  </Steps.Content>
                ))}
              </Box>
            </Card.Body>
            <Card.Footer
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <ButtonGroup
                size="sm"
                variant="outline"
              >
                <Steps.PrevTrigger asChild>
                  <Button type="button">Anterior</Button>
                </Steps.PrevTrigger>
                <Steps.NextTrigger asChild>
                  <Button type="button">Próximo</Button>
                </Steps.NextTrigger>
              </ButtonGroup>
              <Button
                type="submit"
                size="sm"
                disabled={step !== steps.length - 1}
              >
                Confirmar
              </Button>
            </Card.Footer>
          </Card.Root>
        </Steps.Root>
      </FormProvider>
    </>
  );
};

export default CreateProductForm;
