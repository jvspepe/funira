import { z } from 'zod';

export const createCategorySchema = z.object({
  en: z.string().nonempty('Campo obrigatório').min(3, 'Mínimo 3 caractéres'),
  pt: z.string(),
});

export type CreateCategorySchema = z.infer<typeof createCategorySchema>;
