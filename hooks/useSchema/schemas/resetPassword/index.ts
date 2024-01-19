import { z } from 'zod';

import { useZodValidators } from '@/hooks/useZodValidators';

export const ResetPasswordFormSchema = z.object({
  password: useZodValidators.passwordSchema(), // Adjust the validation as needed
});
