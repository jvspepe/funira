import { DefaultValues } from 'react-hook-form';
import { z } from 'zod';

export const signUpSchema = z
  .object({
    firstName: z.string().nonempty('Campo obrigatório'),
    lastName: z.string().nonempty('Campo obrigatório'),
    email: z.string().email('E-mail inválido').nonempty('Campo obrigatório'),
    password: z.string().nonempty('Campo obrigatório'),
    confirmPassword: z.string().nonempty('Campo obrigatório'),
    rememberUser: z.boolean(),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: 'custom',
        message: 'As senhas devem ser iguais',
        path: ['password', 'confirmPassword'],
      });
    }
  });

export type SignUpSchema = z.infer<typeof signUpSchema>;

export const signUpDefaultValues: DefaultValues<SignUpSchema> = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
  rememberUser: false,
};
