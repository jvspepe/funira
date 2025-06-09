import { z } from 'zod';
import { DefaultValues } from 'react-hook-form';

export const footerFormSchema = z.object({
  email: z
    .string()
    .email({ message: 'E-mail inválido' })
    .nonempty({ message: 'Campo obrigatório' }),
});

export type FooterFormSchema = z.infer<typeof footerFormSchema>;

export const footerFormDefaultValues: DefaultValues<FooterFormSchema> = {
  email: '',
};
