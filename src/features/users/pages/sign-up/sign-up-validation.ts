import type { DefaultValues } from "react-hook-form";

import { z } from "zod";

import { UserSchema } from "@/@types/models";

export const signUpSchema = UserSchema.pick({ email: true })
  .extend({
    confirmPassword: z.string().nonempty("Campo obrigatório"),
    firstName: z.string().nonempty("Campo obrigatório"),
    lastName: z.string().nonempty("Campo obrigatório"),
    password: z.string().nonempty("Campo obrigatório"),
    rememberUser: z.boolean().default(false),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: "custom",
        message: "As senhas devem ser iguais",
        path: ["password", "confirmPassword"],
      });
    }
  });

export type SignUpSchema = z.infer<typeof signUpSchema>;

export const signUpDefaultValues: DefaultValues<SignUpSchema> = {
  confirmPassword: "",
  email: "",
  firstName: "",
  lastName: "",
  password: "",
  rememberUser: false,
};
