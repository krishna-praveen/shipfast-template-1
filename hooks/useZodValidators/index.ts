import { nameSchema } from "./helpers/name.schema";
import { passwordSchema } from "./helpers/password.schema";
import { phoneSchema } from "./helpers/phone.schema";
import { selectSchema } from "./helpers/select.schema";
import { surnameSchema } from "./helpers/surname.schema";

export const useZodValidators = {
  nameSchema,
  surnameSchema,
  phoneSchema,
  passwordSchema,
  selectSchema
};
