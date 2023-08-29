import * as z from 'zod';

export const TagValidation = z.object({
  number: z.string().min(1, { message: 'Tag Number is required' }),
});
