import { z } from 'zod';
export const phoneSchema = () => {
  return z.string().min(1, 'Número é obrigatório').min(10, 'Verifique o número digitado');
};
