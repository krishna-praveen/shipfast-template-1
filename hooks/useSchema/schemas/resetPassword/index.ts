import { z } from 'zod';

import { useZodValidators } from '@/hooks/useZodValidators';

export const resetPasswordFormSchema = z.object({
  password: useZodValidators.passwordSchema(), // Adjust the validation as needed
});
