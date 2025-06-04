import { z } from 'zod';

export const editProductSchema = z.object({
  name: z.object({
    en: z.string().nonempty('Field is required'),
    pt: z.string(),
  }),
  summary: z.object({
    en: z.string().nonempty('Field is required'),
    pt: z.string(),
  }),
  description: z.object({
    en: z.string().nonempty('Field is required'),
    pt: z.string(),
  }),
  price: z.string(),
  category: z.string().array(),
  dimensions: z.object({
    depth: z.string().optional(),
    height: z.string().nonempty('Field is required'),
    width: z.string().nonempty('Field is required'),
  }),
});

export type EditProductSchema = z.infer<typeof editProductSchema>;
