import { DefaultValues } from 'react-hook-form';
import { z } from 'zod';

export const createProductSchema = z.object({
  name: z.object({
    en: z.string(),
    pt: z.string().nonempty(),
  }),
  price: z.string().nonempty(),
  category: z.string().nonempty().array(),
  summary: z.object({
    en: z.string(),
    pt: z.string().nonempty(),
  }),
  description: z.object({
    en: z.string(),
    pt: z.string().nonempty(),
  }),
  dimensions: z.object({
    depth: z.string().optional(),
    height: z.string().nonempty(),
    width: z.string().nonempty(),
  }),
  imageCover: z.instanceof(FileList).nullable(),
});

export type CreateProductSchema = z.infer<typeof createProductSchema>;

export const defaultValues: DefaultValues<CreateProductSchema> = {
  name: {
    en: '',
    pt: '',
  },
  price: '0',
  category: [],
  summary: {
    en: '',
    pt: '',
  },
  description: {
    en: '',
    pt: '',
  },
  dimensions: {
    depth: '',
    height: '',
    width: '',
  },
  imageCover: null,
};
