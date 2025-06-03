import { z } from 'zod';
import { DefaultValues } from 'react-hook-form';

export const signInSchema = z.object({
  email: z.string().email('E-mail inválido').nonempty('Campo obrigatório'),
  password: z.string().nonempty('Campo obrigatório'),
  rememberUser: z.boolean(),
});

export type SignInSchema = z.infer<typeof signInSchema>;

export const signInDefaultValues: DefaultValues<SignInSchema> = {
  email: '',
  password: '',
  rememberUser: false,
};
