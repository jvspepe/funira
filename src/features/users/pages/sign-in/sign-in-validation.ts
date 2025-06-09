import { z } from 'zod';

export const signInSchema = z.object({
  email: z.string().email('E-mail inválido').nonempty('Campo obrigatório'),
  password: z.string().nonempty('Campo obrigatório'),
  rememberUser: z.boolean(),
});

export type SignInSchema = z.infer<typeof signInSchema>;
