import { DefaultValues } from 'react-hook-form';
import { z } from 'zod';

export const newsletterFormSchema = z.object({
  email: z.string().email().nonempty(),
});

export type NewsletterFormSchema = z.infer<typeof newsletterFormSchema>;

export const newsletterFormDefaultValues: DefaultValues<NewsletterFormSchema> =
  {
    email: '',
  };
