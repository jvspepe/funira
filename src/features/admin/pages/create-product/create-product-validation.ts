import type { DefaultValues } from "react-hook-form";
import { z } from "zod";

export const createProductSchema = z.object({
  category: z.string().nonempty().array(),
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
  name: z.object({
    en: z.string(),
    pt: z.string().nonempty(),
  }),
  price: z.string().nonempty(),
  summary: z.object({
    en: z.string(),
    pt: z.string().nonempty(),
  }),
});

export type CreateProductSchema = z.infer<typeof createProductSchema>;

export const defaultValues: DefaultValues<CreateProductSchema> = {
  category: [],
  description: {
    en: "",
    pt: "",
  },
  dimensions: {
    depth: "",
    height: "",
    width: "",
  },
  imageCover: null,
  name: {
    en: "",
    pt: "",
  },
  price: "0",
  summary: {
    en: "",
    pt: "",
  },
};
