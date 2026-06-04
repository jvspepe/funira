import type { DefaultValues } from "react-hook-form";
import { z } from "zod";

export const footerFormSchema = z.object({
  email: z
    .string()
    .email({ message: "E-mail inválido" })
    .nonempty({ message: "Campo obrigatório" }),
});

export type FooterFormSchema = z.infer<typeof footerFormSchema>;

export const footerFormDefaultValues: DefaultValues<FooterFormSchema> = {
  email: "",
};
