import { z } from 'zod';
import { DefaultValues } from 'react-hook-form';
import { UserSchema } from '@/@types/models';

export const signUpSchema = UserSchema.pick({ email: true })
  .extend({
    firstName: z.string().nonempty('Campo obrigatório'),
    lastName: z.string().nonempty('Campo obrigatório'),
    password: z.string().nonempty('Campo obrigatório'),
    confirmPassword: z.string().nonempty('Campo obrigatório'),
    rememberUser: z.boolean().default(false),
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
