import { z } from "zod";

export const editProductSchema = z.object({
  category: z.string().array(),
  description: z.object({
    en: z.string().nonempty("Field is required"),
    pt: z.string(),
  }),
  dimensions: z.object({
    depth: z.string().optional(),
    height: z.string().nonempty("Field is required"),
    width: z.string().nonempty("Field is required"),
  }),
  name: z.object({
    en: z.string().nonempty("Field is required"),
    pt: z.string(),
  }),
  price: z.string(),
  summary: z.object({
    en: z.string().nonempty("Field is required"),
    pt: z.string(),
  }),
});

export type EditProductSchema = z.infer<typeof editProductSchema>;
