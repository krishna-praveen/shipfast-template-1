import { z } from 'zod';
export const nameSchema = () => {
  return z.string()
    .min(1, { message: 'Nome é obrigatório!' })
    .min(2, { message: 'É necessário nome e sobrenome' })
    .max(40, { message: 'Nome muito grande, máximo de 40 caracteres' })
    .refine(value => {
      if (value) {
        const nameWithNumber = new RegExp(/[0-9]/).test(value.trim());
        if (nameWithNumber) {
          throw { message: 'Nomes com números não são permitidos', path: [] };
        }
        const nameValid = /\b[A-Za-zÀ-ú.][A-Za-zÀ-ú.]+,?\s[A-Za-zÀ-ú.][A-Za-zÀ-ú.]{2,19}\b/gi;

        return nameValid.test(value.trim());
      }
      return false;
    }, { message: 'É necessário nome e sobrenome', path: [] })
    .refine(value => {
      if (value) {
        const nameValid = value
          .trim()
          .split(/ +/)
          .every(splitedValue => new RegExp(/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ'-.\s]+$/).test(splitedValue));
        return nameValid;
      }
      return false;
    }, { message: "Caracteres especiais /*#?@ não são permitidos", path: [] });
};
