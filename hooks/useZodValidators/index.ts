import { nameSchema } from './helpers/name.schema';
import { passwordSchema } from './helpers/password.schema';
import { phoneSchema } from './helpers/phone.schema';

export const useZodValidators = {
  nameSchema,
  phoneSchema,
  passwordSchema
}
